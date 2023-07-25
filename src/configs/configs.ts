export class Configs {
    static readonly PORT = process.env.PORT || 3001;

    static readonly COMMIT_MESSAGE = 'written unit tests';
    static readonly ACCESS_TOKEN = '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';
    static readonly REPO_OWNER = 'taronveq';
    static readonly REPO_NAME = 'gpt-test';
    static readonly FILE_PATH = 'path/to/your/new_test.swift';
    static readonly BASE_GITHUB_URL = 'https://api.github.com';

    static readonly OPENAI_API_KEY = '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';
    static readonly OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
    static readonly SYSTEM_MESSAGE = {
        role: 'system',
        content: 'You are unit test expert. generate unit test. print only code',
    };
    static readonly USER_MESSAGE = {
        role: 'user',
    };
    static readonly MODEL = 'gpt-3.5-turbo';
}
