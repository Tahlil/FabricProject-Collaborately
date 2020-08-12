#!/bin/bash
# Script to install chaincode onto a peer node
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_ID=cli
export CORE_PEER_ADDRESS=peer2.org0.example.com:7051
export CORE_PEER_TLS_ROOTCERT_FILE=/vars/keyfiles/peerOrganizations/org0.example.com/peers/peer2.org0.example.com/tls/ca.crt
export CORE_PEER_LOCALMSPID=org0-example-com
export CORE_PEER_MSPCONFIGPATH=/vars/keyfiles/peerOrganizations/org0.example.com/users/Admin@org0.example.com/msp
cd /go/src/github.com/chaincode/collaborately-contract


if [ ! -f "collaborately-contract_node_1.0.tar.gz" ]; then
  peer lifecycle chaincode package collaborately-contract_node_1.0.tar.gz \
    -p /go/src/github.com/chaincode/collaborately-contract/node/ \
    --lang node --label collaborately-contract_1.0
fi

peer lifecycle chaincode install collaborately-contract_node_1.0.tar.gz
