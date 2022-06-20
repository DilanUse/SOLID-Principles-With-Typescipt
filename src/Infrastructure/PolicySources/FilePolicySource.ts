import fs from 'fs';
import IPolicySource from '../../Core/Interfaces/IPolicySource';

export default class FilePolicySource implements IPolicySource{
    GetPolicyFromSource(): string {
        return fs.readFileSync('assets/policy.json', 'utf8');
    }
}
