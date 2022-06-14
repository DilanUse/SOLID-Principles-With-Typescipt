import fs from 'fs';

export default class FilePolicySource {
    GetPolicyFromSource(): string {
        return fs.readFileSync('assets/policy.json', 'utf8');
    }
}
