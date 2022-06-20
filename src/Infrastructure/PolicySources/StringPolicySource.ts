import IPolicySource from '../../Core/Interfaces/IPolicySource';

export default class StringPolicySource implements IPolicySource {
    public PolicyString: string = '';

    GetPolicyFromSource(): string {
        return this.PolicyString;
    }
}
