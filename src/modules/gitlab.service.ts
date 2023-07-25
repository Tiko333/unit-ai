import axios, { AxiosResponse } from 'axios';

import OpenAiService from './openAi.service';
import { Configs } from '../configs/configs';
import { GitlabServiceCredentials } from '../types/unit-ai-ctrl.types';

export = class GitlabService {
    constructor(private readonly openAiService: OpenAiService) {}

    async pushCommit(credentials: GitlabServiceCredentials): Promise<string> {
        const { data } = await this.getDiff(credentials.diff_url);

        try {
            const response = await this.openAiService.commitNewFile(data);

            await this.commitNewFile(response.data.choices[0]?.message?.content || '', credentials.ref);
            return response.data.choices[0]?.message?.content || '';
        } catch (error) {
            throw new Error(`Error generating chat response: ${error.message}`);
        }
    }

    private async getDiff(diffUrl: string): Promise<AxiosResponse<string>> {
        return axios.get(diffUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    private async commitNewFile(openAIResponse, ref): Promise<void> {
        try {
            const headers = {
                Authorization: `Bearer ${Configs.ACCESS_TOKEN}`,
            };

            // Step 1: Get the latest commit's SHA for the branch
            const branchResponse = await axios.get(
                `${Configs.BASE_GITHUB_URL}/repos/${Configs.REPO_OWNER}/${Configs.REPO_NAME}/git/refs/heads/${ref}`,
                { headers }
            );
            const latestCommitSha = branchResponse.data.object.sha;

            // Step 2: Create a new blob (file content)
            const blobResponse = await axios.post(
                `${Configs.BASE_GITHUB_URL}/repos/${Configs.REPO_OWNER}/${Configs.REPO_NAME}/git/blobs`,
                {
                    content: openAIResponse,
                    encoding: 'utf-8',
                },
                { headers }
            );

            // Step 3: Create a new tree object with the new file
            const treeResponse = await axios.post(
                `${Configs.BASE_GITHUB_URL}/repos/${Configs.REPO_OWNER}/${Configs.REPO_NAME}/git/trees`,
                {
                    base_tree: latestCommitSha,
                    tree: [
                        {
                            path: Configs.FILE_PATH,
                            mode: '100644', // Regular file mode
                            type: 'blob',
                            sha: blobResponse.data.sha,
                        },
                    ],
                },
                { headers }
            );

            // Step 4: Create a new commit object
            const commitResponse = await axios.post(
                `${Configs.BASE_GITHUB_URL}/repos/${Configs.REPO_OWNER}/${Configs.REPO_NAME}/git/commits`,
                {
                    message: Configs.COMMIT_MESSAGE,
                    tree: treeResponse.data.sha,
                    parents: [latestCommitSha],
                },
                { headers }
            );

            // Step 5: Update the branch reference
            await axios.patch(
                `${Configs.BASE_GITHUB_URL}/repos/${Configs.REPO_OWNER}/${Configs.REPO_NAME}/git/refs/heads/${ref}`,
                {
                    sha: commitResponse.data.sha,
                },
                { headers }
            );

            console.log('New file committed successfully.');
        } catch (error) {
            console.error('Failed to commit new file:', error.message);
        }
    }
};
