/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { registerLicense } from '@syncfusion/ej2-base';


registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF5cWWFCdkx3Qnxbf1x0ZFRGal1XTnRbUj0eQnxTdEFjXn5WcnZXR2JZVkF1Xg==');


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
