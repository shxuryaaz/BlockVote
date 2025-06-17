// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    address public admin;

    struct Proposal {
        string question;
        string[] options;
        uint[] voteCounts;
    }

    Proposal[] public proposals;

    // Tracks if a user has voted on a specific proposal: hasVoted[proposalId][voterAddress] => true/false
    mapping(uint => mapping(address => bool)) public hasVoted;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    // Create a new proposal
    function createProposal(string memory _question, string[] memory _options) public onlyAdmin {
        require(bytes(_question).length > 0, "Question cannot be empty");
        require(_options.length >= 2, "At least two options required");

        Proposal storage newProposal = proposals.push();
        newProposal.question = _question;
        newProposal.options = _options;
        newProposal.voteCounts = new uint[](_options.length);
    }

    // Vote on a proposal
    function vote(uint _proposalId, uint _optionIndex) public {
        require(_proposalId < proposals.length, "Invalid proposal ID");
        require(!hasVoted[_proposalId][msg.sender], "You have already voted on this proposal");

        Proposal storage proposal = proposals[_proposalId];
        require(_optionIndex < proposal.options.length, "Invalid option");

        proposal.voteCounts[_optionIndex]++;
        hasVoted[_proposalId][msg.sender] = true;
    }

    // Get total number of proposals
    function getProposalsCount() public view returns (uint) {
        return proposals.length;
    }

    // Get proposal by ID
    function getProposal(uint _proposalId) public view returns (
        string memory question,
        string[] memory options,
        uint[] memory voteCounts
    ) {
        require(_proposalId < proposals.length, "Invalid proposal ID");
        Proposal storage proposal = proposals[_proposalId];
        return (proposal.question, proposal.options, proposal.voteCounts);
    }

    // Check if a user has voted on a specific proposal
    function hasVotedOn(uint _proposalId, address _voter) public view returns (bool) {
        return hasVoted[_proposalId][_voter];
    }
}
