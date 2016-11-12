angular
.module('vowolita', [
    'vowolita.core',
    'vowolita.main',
    'vowolita.menuDrawer',
    'vowolita.mainmenu',
    'vowolita.storage',
    'vowolita.auth',
    'vowolita.profile',
    'vowolita.ekey',
    'vowolita.setting',
    'vowolita.templates'
]);

setTimeout(function(){ angular.bootstrap(document, ['vowolita']); });

