export default {
  "Balance": "u128",
  "IdentityId": "[u8;32]",
  "SecurityToken": {
    "name": "Vec<u8>",
    "total_supply": "Balance",
    "owner_did": "IdentityId",
    "divisible": "bool"
  },
  "Restriction": {
    "name": "Vec<u8>",
    "token_id": "u32",
    "can_transfer": "bool"
  },
  "Whitelist": {
    "investor_did": "IdentityId",
    "canSendAfter": "Moment",
    "canReceiveAfter": "Moment"
  },
  "Issuer": {
    "did": "IdentityId",
    "access_level": "u16",
    "active": "bool"
  },
  "Investor": {
    "did": "IdentityId",
    "access_level": "u16",
    "active": "bool",
    "jurisdiction": "u16"
  },
  "Key": "[u8;32]",
  "Permission": {
    "_enum": [
      "Full",
      "Admin",
      "Operator",
      "SpendFunds"
    ]
  },
  "SigningKeyType": {
    "_enum": [
      "External",
      "Identity",
      "Multisig",
      "Relayer"
    ]
  },
  "SigningKey": {
    "key": "Key",
    "type": "SigningKeyType",
    "permissions": "Vec<Permission>"
  },
  "IdentityRole": {
    "_enum": [
      "Issuer",
      "SimpleTokenIssuer",
      "Validator",
      "ClaimIssuer",
      "Investor",
      "NodeRunner",
      "PM",
      "KYCAMLClaimIssuer",
      "AccreditedInvestorClaimIssuer",
      "VerifiedIdentityClaimIssuer"
    ]
  },
  "DidRecord": {
    "roles": "Vec<IdentityRole>",
    "master_key": "Key",
    "signing_keys": "Vec<SigningKey>"
  },
  "Claim": {
    "issuance_date": "Moment",
    "expiry": "Moment",
    "claim_value": "ClaimValue"
  },
  "ClaimMetaData": {
    "claim_key": "Vec<u8>",
    "claim_issuer": "IdentityId"
  },
  "ClaimValue": {
    "data_type": "DataTypes",
    "value": "Vec<u8>"
  },
  "DataTypes": {
    "_enum": [
      "U8",
      "U16",
      "U32",
      "U64",
      "U128",
      "Bool",
      "VecU8"
    ]
  },
  "AssetRule": {
    "sender_rules": "Vec<RuleData>",
    "receiver_rules": "Vec<RuleData>"
  },
  "Operators": {
    "_enum": [
      "EqualTo",
      "NotEqualTo",
      "LessThan",
      "GreaterThan",
      "LessOrEqualTo",
      "GreaterOrEqualTo"
    ]
  },
  "RuleData": {
    "key": "Vec<u8>",
    "value": "Vec<u8>",
    "trusted_issuers": "Vec<IdentityId>",
    "operator": "Operators"
  },
  "STO": {
    "beneficiary_did": "IdentityId",
    "cap": "Balance",
    "sold": "Balance",
    "rate": "u64",
    "start_date": "Moment",
    "end_date": "Moment",
    "active": "bool"
  },
  "Investment": {
    "investor_did": "IdentityId",
    "amount_paid": "Balance",
    "tokens_purchased": "Balance",
    "last_purchase_date": "Moment"
  },
  "SimpleTokenRecord": {
    "ticker": "Vec<u8>",
    "total_supply": "Balance",
    "owner_did": "IdentityId"
  },
  "FeeOf": "Balance",
  "TSMoment": "u64",
  "Moment": "u64",
  "Dividend": {
    "amount": "Balance",
    "active": "bool",
    "maturates_at": "Option<u64>",
    "expires_at": "Option<u64>",
    "payout_currency": "Option<Vec<u8>>",
    "checkpoint_id": "u64"
  },
  "RegistryEntry": {
    "token_type": "u32",
    "owner_did": "IdentityId"
  },
  "SignData": {
    "custodian_did": "IdentityId",
    "holder_did": "IdentityId",
    "ticker": "Vec<u8>",
    "value": "Balance",
    "nonce": "u16"
  },
  "Proposal": {
    "title": "Vec<u8>",
    "info_link": "Vec<u8>",
    "choices": "Vec<Vec<u8>>"
  },
  "Ballot": {
    "checkpoint_id": "u64",
    "voting_start": "Moment",
    "voting_end": "Moment",
    "proposals": "Vec<Proposal>"
  }
}