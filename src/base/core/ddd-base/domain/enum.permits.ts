export enum EnumPermits {
  MANAGE = 'manage',

  // Model_Action

  USER_MANAGE = 'UserDomain_manage',
  USER_READ = 'UserDomain_read',
  USER_UPDATE = 'UserDomain_update',
  USER_DELETE = 'UserDomain_delete',
  USER_CREATE = 'UserDomain_create',
  USER_UPDATE_PASSWORD = 'UserDomain_updatePassword',
  USER_UPDATE_PERMITS = 'UserDomain_updatePermits',

  MUNICIPALITY_MANAGE = 'MunicipalityDomain_manage',
  MUNICIPALITY_READ = 'MunicipalityDomain_read',
  MUNICIPALITY_CREATE = 'MunicipalityDomain_create',

  PROVINCE_MANAGE = 'ProvinceDomain_manage',
  PROVINCE_READ = 'ProvinceDomain_read',
  PROVINCE_CREATE = 'ProvinceDomain_create',

  ORGANIZATION_MANAGE = 'OrganizationDomain_manage',
  ORGANIZATION_READ = 'OrganizationDomain_read',
  ORGANIZATION_UPDATE = 'OrganizationDomain_update',
  ORGANIZATION_DELETE = 'OrganizationDomain_delete',
  ORGANIZATION_CREATE = 'OrganizationDomain_create',
  ORGANIZATION_UPDATE_REPRESENTATIVE = 'OrganizationDomain_updateRepresentative',
  ORGANIZATION_GENERATE_API_KEY = 'OrganizationDomain_generateApiKey',

  SERVICE_MANAGE = 'ServiceDomain_manage',
  SERVICE_READ = 'ServiceDomain_read',
  SERVICE_UPDATE = 'ServiceDomain_update',
  SERVICE_DELETE = 'ServiceDomain_delete',
  SERVICE_CREATE = 'ServiceDomain_create',

  TAX_MANAGE = 'TaxDomain_manage',
  TAX_READ = 'TaxDomain_read',
  TAX_DELETE = 'TaxDomain_delete',
  TAX_CREATE = 'TaxDomain_create',
  TAX_UPDATE = 'TaxDomain_update',

  RELATION_MANAGE = 'RelationDomain_manage',
  RELATION_READ = 'RelationDomain_read',
  RELATION_UPDATE = 'RelationDomain_update',
  RELATION_DELETE = 'RelationDomain_delete',
  RELATION_CREATE = 'RelationDomain_create',
  RELATION_GET_PROFITS = 'RelationDomain_getProfits',

  AGENCY_MANAGE = 'AgencyDomain_manage',
  AGENCY_READ = 'AgencyDomain_read',
  AGENCY_CREATE = 'AgencyDomain_create',
  AGENCY_UPDATE = 'AgencyDomain_update',
  AGENCY_DELETE = 'AgencyDomain_delete',

  SUPPLY_CHAIN_MANAGE = 'SupplyChainDomain_manage',
  SUPPLY_CHAIN_CREATE = 'SupplyChainDomain_create',
  SUPPLY_CHAIN_DELETE = 'SupplyChainDomain_delete',
  SUPPLY_CHAIN_READ = 'SupplyChainDomain_read',
  SUPPLY_CHAIN_UPDATE = 'SupplyChainDomain_update',
  SUPPLY_CHAIN_CHANGE_ASSIGNMENT = 'SupplyChainDomain_changeAssignment',

  GROUP_MANAGE = 'GroupDomain_manage',
  GROUP_CREATE = 'GroupDomain_create',
  GROUP_DELETE = 'GroupDomain_delete',
  GROUP_UPDATE = 'GroupDomain_update',
  GROUP_READ = 'GroupDomain_read',
  GROUP_CHANGE_ASSIGNMENT = 'GroupDomain_changeAssignment',

  SUB_GROUP_MANAGE = 'SubGroupDomain_manage',
  SUB_GROUP_CREATE = 'SubGroupDomain_create',
  SUB_GROUP_DELETE = 'SubGroupDomain_delete',
  SUB_GROUP_UPDATE = 'SubGroupDomain_update',
  SUB_GROUP_READ = 'SubGroupDomain_read',
  SUB_GROUP_CHANGE_ASSIGNMENT = 'SubGroupDomain_changeAssignment',

  DRIVER_MANAGE = 'DriverDomain_manage',
  DRIVER_READ = 'DriverDomain_read',
  DRIVER_CREATE = 'DriverDomain_create',
  DRIVER_UPDATE = 'DriverDomain_update',
  DRIVER_DELETE = 'DriverDomain_delete',
  DRIVER_CHANGE_ASSIGNMENT = 'DriverDomain_changeAssignment',

  ROUND_ROBIN_MANAGE = 'RRDomain_manage',
  ROUND_ROBIN_CREATE = 'RRDomain_create',
  ROUND_ROBIN_UPDATE = 'RRDomain_update',
  ROUND_ROBIN_DELETE = 'RRDomain_delete',
  ROUND_ROBIN_READ = 'RRDomain_read',
  ROUND_ROBIN_RESET_WEIGHT = 'RRDomain_reset',

  DELIVERY_CASH_MANAGE = 'DeliveryCashDomain_manage',
  DELIVERY_CASH_CREATE = 'DeliveryCashDomain_create',
  DELIVERY_CASH_READ = 'DeliveryCashDomain_read',
  DELIVERY_CASH_UPDATE = 'DeliveryCashDomain_update',
  DELIVERY_CASH_DELETE = 'DeliveryCashDomain_delete',
  DELIVERY_CASH_CHANGE_STATUS = 'DeliveryCashDomain_changeStatus',
  DELIVERY_CASH_CHANGE_HIGH_PRIORITY = 'DeliveryCashDomain_changeHighPriority',
  DELIVERY_CASH_MANUAL_ASSIGN_SUPPLY_CHAIN = 'DeliveryCashDomain_manualAssignSupplyChain',
  DELIVERY_CASH_MANUAL_ASSIGN_GROUP = 'DeliveryCashDomain_manualAssignGroup',
  DELIVERY_CASH_MANUAL_ASSIGN_SUB_GROUP = 'DeliveryCashDomain_manualAssignSubGroup',
  DELIVERY_CASH_MANUAL_ASSIGN_DRIVER = 'DeliveryCashDomain_manualAssignDriver',
  DELIVERY_CASH_GET_RESUME = 'DELIVERY_CASH_GET_RESUME',
}
