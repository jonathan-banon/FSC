const Encore = require('@symfony/webpack-encore');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')

    // ENTRY CONFIG
    .addEntry('app', './assets/react/index.js')
    .addStyleEntry('styles', './assets/styles/styles.scss')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    .enableSingleRuntimeChunk()

    // FEATURE CONFIG
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())

    // CSS Configuration
    .configureCssLoader(options => {
        options.sourceMap = true;
    })

    // Babel configuration
    .configureBabel((config) => {
        if (Encore.isDev()) {
            config.cacheDirectory = true;
            config.cacheCompression = false;
        }
    })
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = '3.38';
    })

    // Sass configuration améliorée
    .enableSassLoader((options) => {
        options.sourceMap = true;
        options.sassOptions = {
            outputStyle: Encore.isProduction() ? 'compressed' : 'expanded',
            sourceMap: true
        };
    })

    // React support
    .enableReactPreset()

    // Configuration du mode watch améliorée
    .configureWatchOptions(watchOptions => {
        watchOptions.poll = 1000; // Polling toutes les secondes
        watchOptions.aggregateTimeout = 300; // Délai avant recompilation
        watchOptions.ignored = /node_modules/; // Ignorer node_modules
    })

    // Configuration du dev-server
    .configureDevServerOptions(options => {
        options.allowedHosts = 'all';
        options.hot = true;
        options.liveReload = true;
        options.watchFiles = {
            paths: ['assets/**/*', 'templates/**/*.twig'],
            options: {
                usePolling: true,
                interval: 1000
            }
        };
        options.client = {
            overlay: {
                errors: true,
                warnings: false
            }
        };
    })
;

// Debug en mode développement
if (Encore.isDev()) {
    console.log('🔍 Mode développement activé');
    console.log('📁 Surveillance des fichiers:', ['assets/**/*', 'templates/**/*.twig']);
}

module.exports = Encore.getWebpackConfig();