import PolicyType from './PolicyType';

class Policy {
    public Type: PolicyType;

    // Life Insurance
    public FullName?: string;
    public DateOfBirth?: Date;
    public IsSmoker?: boolean;
    public Amount?: number

    // Land
    public Address?: string;
    public Size?: number;
    public Valuation?: number;
    public BondAmount?: number;

    // Auto
    public Make?: string;
    public Model?: string;
    public Year?: number;
    public Miles?: number;
    public Deductible?: number;
}

export { Policy };
