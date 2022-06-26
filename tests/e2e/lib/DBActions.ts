import type { Client } from 'pg'

let PGClient: Client

export class DBActions {
    async connectDB(dbUsername: string, dbPassword: string, dbServerName: string, dbPort: string, dbName: string) {
        const connectionString = `postgres://${dbUsername}:${dbPassword}@${dbServerName}:${dbPort}/${dbName}`
        PGClient = await new PGClient(connectionString)
        await PGClient.connect()
    }

    async query(queryString: string): Promise<void> {
        return PGClient.query(queryString)
    }
}
