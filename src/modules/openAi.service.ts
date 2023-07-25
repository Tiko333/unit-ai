import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Configs } from '../configs/configs';

export = class OpenAiService {
    async commitNewFile(data: string): Promise<AxiosResponse<any>> {
        const chatRequest = {
            model: Configs.MODEL,
            messages: [Configs.SYSTEM_MESSAGE, { ...Configs.USER_MESSAGE, content: data }],
        };
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${Configs.OPENAI_API_KEY}`,
            },
        };

        return axios.post(Configs.OPENAI_URL, chatRequest, config);
    }
};
