// utility function to extract the IPFS CID from a string
export default function extractIPFSCID(str: string) {
  const cid = str.match(/ipfs\/(.*)/);
  if (cid) {
    return cid[1];
  }
  return str;
}