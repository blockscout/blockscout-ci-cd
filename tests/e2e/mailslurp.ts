import { MailSlurp } from 'mailslurp-client'

(async () => {
    const mailslurp = new MailSlurp({ apiKey: `9eff66704fca2515a35dd106e889ef36e7a9701cc00b76fb5bbf96c8135247c1` })
    const emails = await mailslurp.getEmails(`3cad691b-44e3-4613-bab2-c3ef59ae1f03`)
    console.log(`email: ${emails}`)
})()
