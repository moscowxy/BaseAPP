// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title Fethet - A simple Base Sepolia demonstration contract
contract Fethet {
    event ValueStored(address indexed from, uint256 value);

    uint256 private storedValue;

    /// @notice Stores a new value and emits an event.
    /// @param newValue The value to persist.
    function store(uint256 newValue) external {
        storedValue = newValue;
        emit ValueStored(msg.sender, newValue);
    }

    /// @notice Reads the currently stored value.
    /// @return The stored value.
    function retrieve() external view returns (uint256) {
        return storedValue;
    }
}
