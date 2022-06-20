import IPolicySource from '../src/Core/Interfaces/IPolicySource';

export default class FakePolicySource implements IPolicySource {
    public PolicyString: string = "";

    public GetPolicyFromSource(): string
    {
        return this.PolicyString;
    }
}
