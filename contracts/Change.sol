pragma solidity >=0.4.21 <0.7.0;

contract Change {
    struct Petition {
        uint256 id;
        string title;
        string description;
        uint256 donation;
        address payable recipient;
        address creator;
        uint256 signedCount;
        uint256 goalCount;
        string petitioning;
        uint8 category;
        bool expired;
        mapping(address => bool) signs;
    }

    Petition[] public petitions;
    uint256 public petitionCount = 0;
    address public manager;

    modifier restricted() {
        require(
            msg.sender == manager,
            "Only the owner can call this function."
        );
        _;
    }

    constructor() public {
        manager = msg.sender;
        createPetition({
            title: "Sample Petition",
            description: "This is an initial petition.",
            petitioning: "Somebody",
            goal: 1000,
            recipient: msg.sender,
            categoryIndex: 1
        });
    }

    function isSigned(uint256 id, address user) public view returns (bool) {
        Petition storage petition = petitions[id];
        return petition.signs[user];
    }

    function sign(uint256 id) public {
        Petition storage petition = petitions[id];
        require(
            !petition.signs[msg.sender],
            "You have already signed the petition."
        );
        require(!petition.expired, "The petition is expired.");
        petition.signs[msg.sender] = true;
        petition.signedCount++;
    }

    function donate(uint256 id, uint256 donation) public payable {
        Petition storage petition = petitions[id];
        require(!petition.expired, "The petition is expired.");

        petitions[id].donation += donation;
    }

    function completePetition(uint256 id) public payable restricted {
        Petition storage petition = petitions[id];
        require(
            msg.sender == petition.creator,
            "You are not owner the petition!"
        );
        require(!petition.expired, "The petition is expired already.");

        if (petition.donation > 0) {
            // Transfer the donation
            // petition.recipient.call{value: petition.donation}("");
        }

        petition.expired = true;
    }

    function createPetition(
        string memory title,
        string memory description,
        string memory petitioning,
        uint256 goal,
        uint8 categoryIndex,
        address payable recipient
    ) public {
        Petition memory newPetition = Petition({
            id: petitionCount,
            title: title,
            description: description,
            recipient: recipient,
            category: categoryIndex,
            goalCount: goal,
            petitioning: petitioning,
            donation: 0,
            signedCount: 0,
            creator: msg.sender,
            expired: false
        });

        petitions.push(newPetition);
        petitionCount++;
    }
}
