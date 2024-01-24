// SPDX-License-Identifier: UNLICENSED
pragma solidity =0.8.19;

/**
 * @title ExampleContract
 * @author codewarriorr <codewarriorr@pm.me>
 * @notice Example contract just for demonstration purposes
 */
contract ExampleContract {
  address public owner;
  uint public examplePublicVar;

  /**
   * @notice Modifier to restrict function calls to the owner
   */
  modifier onlyOwner {
    require(msg.sender == owner, "Only the owner can call this function");
    _;
  }

  /**
   * @notice Constructor
   */
  constructor(uint publicVar_) {
    owner = msg.sender;
    examplePublicVar = publicVar_;
  }

  /**
   * @notice Sets the public variable
   * 
   * @param var_ new public variable value
   */
  function setExamplePublicVar(uint var_) external onlyOwner {
    examplePublicVar = var_;
  }

  /**
   * @notice Gets the public variable
   * 
   * @return uint
   */
  function getExamplePublicVar() public view returns (uint) {
    return examplePublicVar;
  }
}