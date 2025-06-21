pragma solidity ^0.8.0;

contract Voting {
    address public admin;

    struct Proposal {
        string question;
        string[] options;
        uint[] voteCounts;
        bool isActive;
    }

    Proposal[] public proposals;
    mapping(uint => mapping(address => bool)) public hasVoted;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier proposalExists(uint _id) {
        require(_id < proposals.length, "Invalid proposal ID");
        _;
    }

    event ProposalCreated(uint indexed proposalId, string question);
    event Voted(uint indexed proposalId, address indexed voter, uint optionIndex);
    event ProposalClosed(uint indexed proposalId);
    event AdminTransferred(address indexed oldAdmin, address indexed newAdmin);

    function createProposal(string memory _question, string[] memory _options) public onlyAdmin {
        require(bytes(_question).length > 0, "Question cannot be empty");
        require(_options.length >= 2, "At least two options required");

        Proposal storage p = proposals.push();
        p.question = _question;
        p.options = _options;
        p.voteCounts = new uint[](_options.length);
        p.isActive = true;

        emit ProposalCreated(proposals.length - 1, _question);
    }

    function vote(uint _proposalId, uint _optionIndex) public proposalExists(_proposalId) {
        Proposal storage p = proposals[_proposalId];
        require(p.isActive, "Voting is closed");
        require(!hasVoted[_proposalId][msg.sender], "Already voted");
        require(_optionIndex < p.options.length, "Invalid option");

        p.voteCounts[_optionIndex]++;
        hasVoted[_proposalId][msg.sender] = true;

        emit Voted(_proposalId, msg.sender, _optionIndex);
    }

    function getProposalsCount() public view returns (uint) {
        return proposals.length;
    }

    function getProposal(uint _proposalId) public view proposalExists(_proposalId) returns (
        string memory,
        string[] memory,
        uint[] memory,
        bool
    ) {
        Proposal storage p = proposals[_proposalId];
        return (p.question, p.options, p.voteCounts, p.isActive);
    }

    function hasVotedOn(uint _proposalId, address _voter) public view returns (bool) {
        return hasVoted[_proposalId][_voter];
    }

    function closeProposal(uint _proposalId) public onlyAdmin proposalExists(_proposalId) {
        proposals[_proposalId].isActive = false;
        emit ProposalClosed(_proposalId);
    }

    function transferAdmin(address newAdmin) public onlyAdmin {
        require(newAdmin != address(0), "Invalid address");
        address old = admin;
        admin = newAdmin;
        emit AdminTransferred(old, newAdmin);
    }
}
