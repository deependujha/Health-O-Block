// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthOBlock {
    mapping(address => string[]) private healthDoc;

    mapping(address => mapping(address => bool)) public isNominee;

    mapping(address => mapping(address => mapping(uint => bool))) public docSharedWithDoctor;

    
    function uploadNewDoc(string calldata _ipfsHash) public {
        healthDoc[msg.sender].push(_ipfsHash);
    }

    function getAllMyDocs() public view returns(string[] memory){
        return healthDoc[msg.sender];
    }

    function addNominee(address _nominee) public{
        isNominee[msg.sender][_nominee]=true;
    }

    function removeNominee(address _nominee) public{
        isNominee[msg.sender][_nominee]=false;
    }

    function getAllDocsAsNominee(address _addr) public view returns(string [] memory){
        require(isNominee[_addr][msg.sender],"you are not nominee");
        return healthDoc[_addr];
    }

    function shareHealthDocWithDoctor(address _addr, uint idx) public{
        require(healthDoc[msg.sender].length>idx,"no doc");
        docSharedWithDoctor[msg.sender][_addr][idx]=true;
    }

    function removeShareHealthDocWithDoctor(address _addr, uint idx) public{
        require(healthDoc[msg.sender].length>idx,"no doc");
        docSharedWithDoctor[msg.sender][_addr][idx]=false;
    }

    function shareHealthDocWithDoctorAsNominee(address _doctorAddress, address _realUser, uint _idx) public{
        require(isNominee[_realUser][msg.sender],"not nominee");
        require(healthDoc[_realUser].length > _idx,"no doc");
        docSharedWithDoctor[_realUser][_doctorAddress][_idx]=true;
    }

    function getDocSharedByCitizen(address _addr, uint _idx) public view returns(string memory){
        require(docSharedWithDoctor[_addr][msg.sender][_idx],"not shared with you");
        return healthDoc[_addr][_idx];
    }

}