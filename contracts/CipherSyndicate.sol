// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@fhevm/lib/Reencrypt.sol";
import "@fhevm/lib/Fhe.sol";

contract CipherSyndicate {
    using Fhe for euint32;
    using Fhe for ebool;
    
    struct LoanApplication {
        euint32 applicationId;
        euint32 requestedAmount;
        euint32 interestRate;
        euint32 loanTerm;
        ebool isApproved;
        ebool isActive;
        string purpose;
        string collateral;
        address borrower;
        uint256 applicationTime;
        uint256 deadline;
    }
    
    struct SyndicateMember {
        euint32 memberId;
        euint32 contributionAmount;
        euint32 riskTolerance;
        ebool isActive;
        address memberAddress;
        uint256 joinTime;
    }
    
    struct LoanPool {
        euint32 poolId;
        euint32 totalAmount;
        euint32 availableAmount;
        euint32 memberCount;
        ebool isActive;
        string poolName;
        address poolManager;
        uint256 creationTime;
    }
    
    struct LoanAgreement {
        euint32 agreementId;
        euint32 loanAmount;
        euint32 interestRate;
        euint32 repaymentAmount;
        ebool isRepaid;
        address borrower;
        address[] syndicateMembers;
        uint256 agreementTime;
        uint256 repaymentDeadline;
    }
    
    mapping(uint256 => LoanApplication) public applications;
    mapping(uint256 => SyndicateMember) public syndicateMembers;
    mapping(uint256 => LoanPool) public loanPools;
    mapping(uint256 => LoanAgreement) public loanAgreements;
    mapping(address => euint32) public borrowerReputation;
    mapping(address => euint32) public memberReputation;
    
    uint256 public applicationCounter;
    uint256 public memberCounter;
    uint256 public poolCounter;
    uint256 public agreementCounter;
    
    address public owner;
    address public verifier;
    
    event ApplicationSubmitted(uint256 indexed applicationId, address indexed borrower, uint32 requestedAmount);
    event MemberJoined(uint256 indexed memberId, address indexed member, uint32 contributionAmount);
    event PoolCreated(uint256 indexed poolId, address indexed manager, string poolName);
    event AgreementCreated(uint256 indexed agreementId, address indexed borrower, uint32 loanAmount);
    event LoanRepaid(uint256 indexed agreementId, uint32 repaymentAmount);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function submitLoanApplication(
        euint32 _requestedAmount,
        euint32 _interestRate,
        euint32 _loanTerm,
        string memory _purpose,
        string memory _collateral,
        uint256 _deadline
    ) public returns (uint256) {
        require(bytes(_purpose).length > 0, "Purpose cannot be empty");
        require(_deadline > block.timestamp, "Deadline must be in the future");
        
        uint256 applicationId = applicationCounter++;
        
        applications[applicationId] = LoanApplication({
            applicationId: _requestedAmount, // Will be set properly
            requestedAmount: _requestedAmount,
            interestRate: _interestRate,
            loanTerm: _loanTerm,
            isApproved: Fhe.asEbool(false),
            isActive: Fhe.asEbool(true),
            purpose: _purpose,
            collateral: _collateral,
            borrower: msg.sender,
            applicationTime: block.timestamp,
            deadline: _deadline
        });
        
        emit ApplicationSubmitted(applicationId, msg.sender, Fhe.decrypt(_requestedAmount));
        return applicationId;
    }
    
    function joinSyndicate(
        uint256 poolId,
        euint32 _contributionAmount,
        euint32 _riskTolerance
    ) public payable returns (uint256) {
        require(loanPools[poolId].poolManager != address(0), "Pool does not exist");
        require(Fhe.decrypt(loanPools[poolId].isActive), "Pool is not active");
        require(msg.value >= Fhe.decrypt(_contributionAmount), "Insufficient contribution");
        
        uint256 memberId = memberCounter++;
        
        syndicateMembers[memberId] = SyndicateMember({
            memberId: _contributionAmount, // Will be set properly
            contributionAmount: _contributionAmount,
            riskTolerance: _riskTolerance,
            isActive: Fhe.asEbool(true),
            memberAddress: msg.sender,
            joinTime: block.timestamp
        });
        
        // Update pool totals
        loanPools[poolId].totalAmount = loanPools[poolId].totalAmount + _contributionAmount;
        loanPools[poolId].memberCount = loanPools[poolId].memberCount + Fhe.asEuint32(1);
        
        emit MemberJoined(memberId, msg.sender, Fhe.decrypt(_contributionAmount));
        return memberId;
    }
    
    function createLoanPool(
        string memory _poolName,
        euint32 _targetAmount
    ) public returns (uint256) {
        require(bytes(_poolName).length > 0, "Pool name cannot be empty");
        
        uint256 poolId = poolCounter++;
        
        loanPools[poolId] = LoanPool({
            poolId: _targetAmount, // Will be set properly
            totalAmount: Fhe.asEuint32(0),
            availableAmount: _targetAmount,
            memberCount: Fhe.asEuint32(0),
            isActive: Fhe.asEbool(true),
            poolName: _poolName,
            poolManager: msg.sender,
            creationTime: block.timestamp
        });
        
        emit PoolCreated(poolId, msg.sender, _poolName);
        return poolId;
    }
    
    function approveApplication(
        uint256 applicationId,
        uint256 poolId,
        ebool isApproved
    ) public {
        require(msg.sender == verifier, "Only verifier can approve applications");
        require(applications[applicationId].borrower != address(0), "Application does not exist");
        require(loanPools[poolId].poolManager != address(0), "Pool does not exist");
        
        applications[applicationId].isApproved = isApproved;
        
        if (Fhe.decrypt(isApproved)) {
            // Create loan agreement
            createLoanAgreement(applicationId, poolId);
        }
    }
    
    function createLoanAgreement(
        uint256 applicationId,
        uint256 poolId
    ) internal returns (uint256) {
        LoanApplication storage application = applications[applicationId];
        LoanPool storage pool = loanPools[poolId];
        
        uint256 agreementId = agreementCounter++;
        
        // Calculate repayment amount with interest
        euint32 interestAmount = application.requestedAmount * application.interestRate / Fhe.asEuint32(100);
        euint32 repaymentAmount = application.requestedAmount + interestAmount;
        
        loanAgreements[agreementId] = LoanAgreement({
            agreementId: application.requestedAmount, // Will be set properly
            loanAmount: application.requestedAmount,
            interestRate: application.interestRate,
            repaymentAmount: repaymentAmount,
            isRepaid: Fhe.asEbool(false),
            borrower: application.borrower,
            syndicateMembers: new address[](0), // Will be populated with actual members
            agreementTime: block.timestamp,
            repaymentDeadline: block.timestamp + Fhe.decrypt(application.loanTerm) * 1 days
        });
        
        // Update pool available amount
        pool.availableAmount = pool.availableAmount - application.requestedAmount;
        
        // Transfer funds to borrower
        payable(application.borrower).transfer(Fhe.decrypt(application.requestedAmount));
        
        emit AgreementCreated(agreementId, application.borrower, Fhe.decrypt(application.requestedAmount));
        return agreementId;
    }
    
    function repayLoan(
        uint256 agreementId
    ) public payable {
        LoanAgreement storage agreement = loanAgreements[agreementId];
        require(agreement.borrower == msg.sender, "Only borrower can repay");
        require(!Fhe.decrypt(agreement.isRepaid), "Loan already repaid");
        require(msg.value >= Fhe.decrypt(agreement.repaymentAmount), "Insufficient repayment amount");
        
        agreement.isRepaid = Fhe.asEbool(true);
        
        // Distribute repayment to syndicate members
        distributeRepayment(agreementId);
        
        emit LoanRepaid(agreementId, Fhe.decrypt(agreement.repaymentAmount));
    }
    
    function distributeRepayment(uint256 agreementId) internal {
        LoanAgreement storage agreement = loanAgreements[agreementId];
        uint256 repaymentPerMember = Fhe.decrypt(agreement.repaymentAmount) / agreement.syndicateMembers.length;
        
        for (uint256 i = 0; i < agreement.syndicateMembers.length; i++) {
            payable(agreement.syndicateMembers[i]).transfer(repaymentPerMember);
        }
    }
    
    function updateReputation(address user, euint32 reputation, bool isBorrower) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        if (isBorrower) {
            borrowerReputation[user] = reputation;
        } else {
            memberReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, Fhe.decrypt(reputation));
    }
    
    function getApplicationInfo(uint256 applicationId) public view returns (
        uint32 requestedAmount,
        uint32 interestRate,
        uint32 loanTerm,
        bool isApproved,
        bool isActive,
        string memory purpose,
        string memory collateral,
        address borrower,
        uint256 applicationTime,
        uint256 deadline
    ) {
        LoanApplication storage application = applications[applicationId];
        return (
            Fhe.decrypt(application.requestedAmount),
            Fhe.decrypt(application.interestRate),
            Fhe.decrypt(application.loanTerm),
            Fhe.decrypt(application.isApproved),
            Fhe.decrypt(application.isActive),
            application.purpose,
            application.collateral,
            application.borrower,
            application.applicationTime,
            application.deadline
        );
    }
    
    function getPoolInfo(uint256 poolId) public view returns (
        uint32 totalAmount,
        uint32 availableAmount,
        uint32 memberCount,
        bool isActive,
        string memory poolName,
        address poolManager,
        uint256 creationTime
    ) {
        LoanPool storage pool = loanPools[poolId];
        return (
            Fhe.decrypt(pool.totalAmount),
            Fhe.decrypt(pool.availableAmount),
            Fhe.decrypt(pool.memberCount),
            Fhe.decrypt(pool.isActive),
            pool.poolName,
            pool.poolManager,
            pool.creationTime
        );
    }
    
    function getAgreementInfo(uint256 agreementId) public view returns (
        uint32 loanAmount,
        uint32 interestRate,
        uint32 repaymentAmount,
        bool isRepaid,
        address borrower,
        uint256 agreementTime,
        uint256 repaymentDeadline
    ) {
        LoanAgreement storage agreement = loanAgreements[agreementId];
        return (
            Fhe.decrypt(agreement.loanAmount),
            Fhe.decrypt(agreement.interestRate),
            Fhe.decrypt(agreement.repaymentAmount),
            Fhe.decrypt(agreement.isRepaid),
            agreement.borrower,
            agreement.agreementTime,
            agreement.repaymentDeadline
        );
    }
    
    function getBorrowerReputation(address borrower) public view returns (uint32) {
        return Fhe.decrypt(borrowerReputation[borrower]);
    }
    
    function getMemberReputation(address member) public view returns (uint32) {
        return Fhe.decrypt(memberReputation[member]);
    }
    
    function withdrawFromPool(uint256 poolId, uint256 amount) public {
        LoanPool storage pool = loanPools[poolId];
        require(pool.poolManager == msg.sender, "Only pool manager can withdraw");
        require(amount <= Fhe.decrypt(pool.availableAmount), "Insufficient pool balance");
        
        pool.availableAmount = pool.availableAmount - Fhe.asEuint32(amount);
        payable(msg.sender).transfer(amount);
    }
}
