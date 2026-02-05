// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Explicitly import tests from tests directory
import '../tests/app/app.component.spec';
import '../tests/app/epic/epic.component.spec';
import '../tests/app/objective/objective.component.spec';
import '../tests/app/overview/overview.component.spec';
import '../tests/app/purpose/purpose.component.spec';
import '../tests/app/result/result.component.spec';
import '../tests/app/summary/summary.component.spec';

// Service tests
import '../tests/services/effort.spec';
import '../tests/services/efforts.spec';
import '../tests/services/objective.spec';
import '../tests/services/result.spec';
import '../tests/services/epic.spec';
import '../tests/services/purpose.spec';
import '../tests/services/year-plan.spec';
