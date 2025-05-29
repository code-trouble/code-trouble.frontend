export interface InitialQuestion {
    id: number;
    title: string;
    description: string;
}

export const initialQuestions: InitialQuestion[] = [
    {
        id: 1,
        title: "Sphinx PDF build failing on readthedocs for Russian translation",
        description:
            "PDF build of Sphinx’s own documentation are failing for Russian translation (example build). .readthedocs.yml is set to build HTML and then PDF, and it's in the second step the failure arises lorem ipsum dolor sit amet lorem ipsum dolor adsasdasd.",
    },
    {
        id: 2,
        title: "Inconsistent results between custom function using terra and a simplified version to calculate global statistic of a raster",
        description:
            "I am running an access poverty analysis on a raster of travel times. Using a slightly altered version of the Foster-Greer-Thorbecke index with exponent Alpha = 0, the following equality holds: lorem ipsum dolor sit amet lorem ipsum dolor sit amet.",
    },
    {
        id: 3,
        title: "How to intercept outgoing SQL statements using Quarkus + Hibernate Reactive (StatementInspector)",
        description:
            "How can I intercept (and modify) outgoing SQL statements using Quarkus and Hibernate Reactive? I tried to do so by implementing a custom StatementInspector, but somehow the inspector is not lorem ipsum dolor sit amet lorem ipsum dolor sit amet.",
    },
    {
        id: 4,
        title: "Optimizing React rendering with useMemo and useCallback",
        description:
            "I have a component that's re-rendering too often. I tried wrapping callbacks in useCallback and values in useMemo, but the performance didn't improve. What am I missing?",
    },
    {
        id: 5,
        title: "Setting up Cypress end-to-end tests for a Vite + React project",
        description:
            "I'm getting ModuleNotFoundError when running Cypress tests in my Vite + React app. The same setup works fine in CRA. How can I configure Cypress to resolve Vite aliases?",
    },
];
