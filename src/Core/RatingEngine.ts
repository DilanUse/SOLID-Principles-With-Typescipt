import { Policy } from './Model/Policy';
import ILogger from './Interfaces/ILogger';
import IPolicySource from './Interfaces/IPolicySource';
import IPolicySerializer from './Interfaces/IPolicySerializer';
import RaterFactory from './Raters/RaterFactory';

export default class RatingEngine
{
    private readonly _logger: ILogger;
    private readonly _policySource: IPolicySource;
    private readonly _policySerializer: IPolicySerializer;
    private readonly _raterFactory: RaterFactory;

    public Rating: number = 0;

    public constructor(
        logger: ILogger,
        policySource: IPolicySource,
        policySerializer: IPolicySerializer,
        raterFactory: RaterFactory,
    ) {
        this._logger = logger
        this._policySource = policySource;
        this._policySerializer = policySerializer;
        this._raterFactory = raterFactory;
    }

    public Rate(): void
    {
        this._logger.Log("Starting rate.");
        this._logger.Log("Loading policy.");

        const policyString = this._policySource.GetPolicyFromSource();
        const policy: Policy = this._policySerializer.GetPolicyFromString(policyString);
        const rater = this._raterFactory.Create(policy);

        this.Rating = rater.Rate(policy);

        this._logger.Log("Rating completed.");
    }
}
