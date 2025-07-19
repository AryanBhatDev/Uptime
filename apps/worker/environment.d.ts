declare global{
    namespace NodeJS{
        interface ProcessEnv{
            REGION_ID:string;
            WORKER_ID:string
        }
    }
}

export {}