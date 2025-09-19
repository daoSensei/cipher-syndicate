// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@fhevm/lib/Reencrypt.sol";
import "@fhevm/lib/Fhe.sol";

contract SyndicateVault {
    using Fhe for euint32;
    using Fhe for ebool;
    
    struct EncryptedLoanData {
        euint32 loanId;
        euint32 amount;
        euint32 interestRate;
        euint32 term;
        ebool isApproved;
        ebool isActive;
        string encryptedPurpose;
        string encryptedCollateral;
        address borrower;
        uint256 timestamp;
    }
    
    struct EncryptedSyndicateData {
        euint32 syndicateId;
        euint32 totalCommitment;
        euint32 currentCommitment;
        euint32 riskLevel;
        ebool isOpen;
        string encryptedTerms;
        address[] participants;
        uint256 createdTime;
    }
    
    struct EncryptedReputation {
        euint32 score;
        euint32 transactionCount;
        euint32 successRate;
        ebool isVerified;
        address user;
        uint256 lastUpdate;
    }
    
    mapping(uint256 => EncryptedLoanData) public loanData;
    mapping(uint256 => EncryptedSyndicateData) public syndicateData;
    mapping(address => EncryptedReputation) public reputationData;
    mapping(address => uint256[]) public userLoans;
    mapping(address => uint256[]) public userSyndicates;
    
    uint256 public loanCounter;
    uint256 public syndicateCounter;
    address public owner;
    address public verifier;
    
    event LoanDataEncrypted(uint256 indexed loanId, address indexed borrower);
    event SyndicateDataEncrypted(uint256 indexed syndicateId, address indexed creator);
    event ReputationUpdated(address indexed user, uint32 score);
    event DataAccessGranted(address indexed user, uint256 indexed dataId);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function encryptLoanData(
        euint32 _amount,
        euint32 _interestRate,
        euint32 _term,
        string memory _encryptedPurpose,
        string memory _encryptedCollateral
    ) public returns (uint256) {
        require(bytes(_encryptedPurpose).length > 0, "Purpose data required");
        require(bytes(_encryptedCollateral).length > 0, "Collateral data required");
        
        uint256 loanId = loanCounter++;
        
        loanData[loanId] = EncryptedLoanData({
            loanId: _amount, // Will be set properly
            amount: _amount,
            interestRate: _interestRate,
            term: _term,
            isApproved: Fhe.asEbool(false),
            isActive: Fhe.asEbool(true),
            encryptedPurpose: _encryptedPurpose,
            encryptedCollateral: _encryptedCollateral,
            borrower: msg.sender,
            timestamp: block.timestamp
        });
        
        userLoans[msg.sender].push(loanId);
        
        emit LoanDataEncrypted(loanId, msg.sender);
        return loanId;
    }
    
    function encryptSyndicateData(
        euint32 _totalCommitment,
        euint32 _riskLevel,
        string memory _encryptedTerms
    ) public returns (uint256) {
        require(bytes(_encryptedTerms).length > 0, "Terms data required");
        
        uint256 syndicateId = syndicateCounter++;
        
        syndicateData[syndicateId] = EncryptedSyndicateData({
            syndicateId: _totalCommitment, // Will be set properly
            totalCommitment: _totalCommitment,
            currentCommitment: Fhe.asEuint32(0),
            riskLevel: _riskLevel,
            isOpen: Fhe.asEbool(true),
            encryptedTerms: _encryptedTerms,
            participants: new address[](0),
            createdTime: block.timestamp
        });
        
        userSyndicates[msg.sender].push(syndicateId);
        
        emit SyndicateDataEncrypted(syndicateId, msg.sender);
        return syndicateId;
    }
    
    function updateEncryptedReputation(
        address user,
        euint32 _score,
        euint32 _transactionCount,
        euint32 _successRate
    ) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        reputationData[user] = EncryptedReputation({
            score: _score,
            transactionCount: _transactionCount,
            successRate: _successRate,
            isVerified: Fhe.asEbool(true),
            user: user,
            lastUpdate: block.timestamp
        });
        
        emit ReputationUpdated(user, Fhe.decrypt(_score));
    }
    
    function approveLoanData(uint256 loanId, ebool isApproved) public {
        require(msg.sender == verifier, "Only verifier can approve");
        require(loanData[loanId].borrower != address(0), "Loan does not exist");
        
        loanData[loanId].isApproved = isApproved;
    }
    
    function joinSyndicate(uint256 syndicateId) public {
        require(syndicateData[syndicateId].createdTime > 0, "Syndicate does not exist");
        require(Fhe.decrypt(syndicateData[syndicateId].isOpen), "Syndicate is closed");
        
        syndicateData[syndicateId].participants.push(msg.sender);
        userSyndicates[msg.sender].push(syndicateId);
    }
    
    function grantDataAccess(address user, uint256 dataId, bool isLoan) public {
        require(msg.sender == owner || msg.sender == verifier, "Unauthorized");
        
        if (isLoan) {
            require(loanData[dataId].borrower != address(0), "Loan does not exist");
        } else {
            require(syndicateData[dataId].createdTime > 0, "Syndicate does not exist");
        }
        
        emit DataAccessGranted(user, dataId);
    }
    
    function getEncryptedLoanData(uint256 loanId) public view returns (
        uint32 amount,
        uint32 interestRate,
        uint32 term,
        bool isApproved,
        bool isActive,
        string memory encryptedPurpose,
        string memory encryptedCollateral,
        address borrower,
        uint256 timestamp
    ) {
        EncryptedLoanData storage loan = loanData[loanId];
        return (
            Fhe.decrypt(loan.amount),
            Fhe.decrypt(loan.interestRate),
            Fhe.decrypt(loan.term),
            Fhe.decrypt(loan.isApproved),
            Fhe.decrypt(loan.isActive),
            loan.encryptedPurpose,
            loan.encryptedCollateral,
            loan.borrower,
            loan.timestamp
        );
    }
    
    function getEncryptedSyndicateData(uint256 syndicateId) public view returns (
        uint32 totalCommitment,
        uint32 currentCommitment,
        uint32 riskLevel,
        bool isOpen,
        string memory encryptedTerms,
        address[] memory participants,
        uint256 createdTime
    ) {
        EncryptedSyndicateData storage syndicate = syndicateData[syndicateId];
        return (
            Fhe.decrypt(syndicate.totalCommitment),
            Fhe.decrypt(syndicate.currentCommitment),
            Fhe.decrypt(syndicate.riskLevel),
            Fhe.decrypt(syndicate.isOpen),
            syndicate.encryptedTerms,
            syndicate.participants,
            syndicate.createdTime
        );
    }
    
    function getEncryptedReputation(address user) public view returns (
        uint32 score,
        uint32 transactionCount,
        uint32 successRate,
        bool isVerified,
        uint256 lastUpdate
    ) {
        EncryptedReputation storage reputation = reputationData[user];
        return (
            Fhe.decrypt(reputation.score),
            Fhe.decrypt(reputation.transactionCount),
            Fhe.decrypt(reputation.successRate),
            Fhe.decrypt(reputation.isVerified),
            reputation.lastUpdate
        );
    }
    
    function getUserLoans(address user) public view returns (uint256[] memory) {
        return userLoans[user];
    }
    
    function getUserSyndicates(address user) public view returns (uint256[] memory) {
        return userSyndicates[user];
    }
}
