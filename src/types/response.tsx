export interface Response {
    errors: any[]
    result: Result
    success: boolean
    hasMore?:boolean
  }
  
  export interface Result {
    data: Daum[]
    meta: Meta
  }
  
  export interface Daum {
    id: number
    combinedCertificates?: CombinedCertificate[]
    uniqueNumber: string
    status: string
    ownershipStatus: string
    vintageYear: number[]
    methodologyVersion: string[]
    countryCode: string
    companyName: string
    standard: string
    tonnes: number
    issuanceDate: string
    deployment: string
    validity: string
    replenishment: any
    carbonCertificateNft: any
    carbonField: CarbonField2
    carbonUser: CarbonUser3
    carbonCertificateOwnerAccount: CarbonCertificateOwnerAccount2
  }
  
  export interface CombinedCertificate {
    id: number
    uniqueNumber: string
    status: string
    ownershipStatus: string
    vintageYear: number[]
    methodologyVersion: string[]
    countryCode: string
    companyName: string
    standard: string
    tonnes: number
    issuanceDate: string
    deployment: string
    validity: string
    replenishment: any
    carbonCertificateNft: any
    carbonField: CarbonField
    carbonUser: CarbonUser
    carbonCertificateOwnerAccount: CarbonCertificateOwnerAccount
  }
  
  export interface CarbonField {
    id: number
    carbonFarm: CarbonFarm
  }
  
  export interface CarbonFarm {
    id: number
    carbonAddress: CarbonAddress
  }
  
  export interface CarbonAddress {
    id: number
    carbonCountry: string
  }
  
  export interface CarbonUser {
    id: number
    user: User
    company: Company
  }
  
  export interface User {
    id: number
  }
  
  export interface Company {
    id: number
    name: string
    address: Address
  }
  
  export interface Address {
    id: number
    country: string
  }
  
  export interface CarbonCertificateOwnerAccount {
    id: number
    carbonUser: CarbonUser2
  }
  
  export interface CarbonUser2 {
    id: number
    user: User2
    company: Company2
  }
  
  export interface User2 {
    id: number
  }
  
  export interface Company2 {
    id: number
    name: string
    address: Address2
  }
  
  export interface Address2 {
    id: number
    country: string
  }
  
  export interface CarbonField2 {
    id: number
    carbonFarm: CarbonFarm2
  }
  
  export interface CarbonFarm2 {
    id: number
    carbonAddress: CarbonAddress2
  }
  
  export interface CarbonAddress2 {
    id: number
    carbonCountry: string
  }
  
  export interface CarbonUser3 {
    id: number
    user: User3
    company: Company3
  }
  
  export interface User3 {
    id: number
  }
  
  export interface Company3 {
    id: number
    name: string
    address: Address3
  }
  
  export interface Address3 {
    id: number
    country: string
  }
  
  export interface CarbonCertificateOwnerAccount2 {
    id: number
    carbonUser: CarbonUser4
  }
  
  export interface CarbonUser4 {
    id: number
    user: User4
    company: Company4
  }
  
  export interface User4 {
    id: number
  }
  
  export interface Company4 {
    id: number
    name: string
    address: Address4
  }
  
  export interface Address4 {
    id: number
    country: string
  }
  
  export interface Meta {
    currentPage: number
    itemCount: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
  }
  