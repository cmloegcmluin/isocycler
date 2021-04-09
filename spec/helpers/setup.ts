import {SpecReporter} from "jasmine-spec-reporter"

Error.stackTraceLimit = Infinity

jasmine.getEnv().clearReporters()
jasmine.getEnv().addReporter(new SpecReporter() as unknown as jasmine.Reporter)
