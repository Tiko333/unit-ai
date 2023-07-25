import { AwilixContainer, createContainer, InjectionMode, Lifetime } from 'awilix';

export class Container {
    readonly registry: AwilixContainer = createContainer({
        injectionMode: InjectionMode.CLASSIC,
    });

    init(): void {
        this.registry.loadModules(
            ['./dist/modules/**/*.js', './dist/controllers/**/*.js', './dist/validators/**/*.js'],
            {
                formatName: 'camelCase',
                resolverOptions: {
                    lifetime: Lifetime.SINGLETON,
                },
            }
        );
    }
}
