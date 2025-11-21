public with sharing class AccountFormController {
  @AuraEnabled
    public static String insertAccount(Map<String, Object> accData) {
        try {
            // Validate Account Name
            String name = (String) accData.get('Name');
            if (String.isBlank(name) || name.length() < 4 || name.length() > 15) {
                throw new AuraHandledException('Account Name must be between 4 and 15 characters');
            }
            
            // Validate Account Number
            String accNumber = (String) accData.get('AccountNumber');
            if (String.isNotBlank(accNumber) && accNumber.length() > 5) {
                throw new AuraHandledException('Account Number cannot exceed 5 digits');
            }
            
            // Create Account
            Account acc = new Account();
            acc.Name = name;
            acc.AccountNumber = accNumber;
            acc.BillingStreet = (String) accData.get('BillingStreet');
            acc.Description = (String) accData.get('Description');
            
            insert acc;
            return acc.Id;
            
        } catch (DmlException e) {
            throw new AuraHandledException('Error inserting account: ' + e.getMessage());
        }
    }
    
    @AuraEnabled
    public static void updateAccount(Map<String, Object> accData) {
        try {
            // Validate Account Name
            String name = (String) accData.get('Name');
            if (String.isBlank(name) || name.length() < 4 || name.length() > 15) {
                throw new AuraHandledException('Account Name must be between 4 and 15 characters');
            }
            
            // Validate Account Number
            String accNumber = (String) accData.get('AccountNumber');
            if (String.isNotBlank(accNumber) && accNumber.length() > 5) {
                throw new AuraHandledException('Account Number cannot exceed 5 digits');
            }
            
            // Update Account
            Account acc = new Account();
            acc.Id = (String) accData.get('Id');
            acc.Name = name;
            acc.AccountNumber = accNumber;
            acc.BillingStreet = (String) accData.get('BillingStreet');
            acc.Description = (String) accData.get('Description');
            
            update acc;
            
        } catch (DmlException e) {
            throw new AuraHandledException('Error updating account: ' + e.getMessage());
        }
    }
}