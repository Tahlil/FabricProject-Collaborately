#!/bin/bash
# Script to join a peer to a channel
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_ID=cli
export CORE_PEER_ADDRESS=peer1.org1.example.com:7051
export CORE_PEER_TLS_ROOTCERT_FILE=/vars/keyfiles/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt
export CORE_PEER_LOCALMSPID=org1-example-com
export CORE_PEER_MSPCONFIGPATH=/vars/keyfiles/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export ORDERER_ADDRESS=orderer3.example.com:7050
export ORDERER_TLS_CA=/vars/keyfiles/ordererOrganizations/example.com/orderers/orderer3.example.com/tls/ca.crt
if [ ! -f "globalchannel.genesis.block" ]; then
  peer channel fetch oldest -o $ORDERER_ADDRESS --cafile $ORDERER_TLS_CA \
  --tls -c globalchannel /vars/globalchannel.genesis.block
fi

peer channel join -b /vars/globalchannel.genesis.block \
  -o $ORDERER_ADDRESS --cafile $ORDERER_TLS_CA --tls
