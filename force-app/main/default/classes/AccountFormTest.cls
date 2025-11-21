@istest
private class AccountFormTest {
    
    @isTest
    static void testInsertAccountSuccess() {
        // Prepare test data
        Map<String, Object> accData = new Map<String, Object>{
            'Name' => 'TestAccount',
            'AccountNumber' => '12345',
            'BillingStreet' => '123 Main St',
            'Description' => 'Test Description'
        };
        
        Test.startTest();
        String accountId = AccountController.insertAccount(accData);
        Test.stopTest();
        
        // Verify
        Account acc = [SELECT Id, Name, AccountNumber, BillingStreet, Description 
                       FROM Account WHERE Id = :accountId];
        System.assertEquals('TestAccount', acc.Name);
        System.assertEquals('12345', acc.AccountNumber);
        System.assertEquals('123 Main St', acc.BillingStreet);
        System.assertEquals('Test Description', acc.Description);
    }
    
    @isTest
    static void testInsertAccountNameTooShort() {
        Map<String, Object> accData = new Map<String, Object>{
            'Name' => 'Abc',
            'AccountNumber' => '123'
        };
        
        Test.startTest();
        try {
            AccountController.insertAccount(accData);
            System.assert(false, 'Expected exception was not thrown');
        } catch (AuraHandledException e) {
            System.assert(e.getMessage().contains('between 4 and 15 characters'));
        }
        Test.stopTest();
    }
    
    @isTest
    static void testInsertAccountNameTooLong() {
        Map<String, Object> accData = new Map<String, Object>{
            'Name' => 'ThisNameIsWayTooLong',
            'AccountNumber' => '123'
        };
        
        Test.startTest();
        try {
            AccountController.insertAccount(accData);
            System.assert(false, 'Expected exception was not thrown');
        } catch (AuraHandledException e) {
            System.assert(e.getMessage().contains('between 4 and 15 characters'));
        }
        Test.stopTest();
    }
    
    @isTest
    static void testInsertAccountNumberTooLong() {
        Map<String, Object> accData = new Map<String, Object>{
            'Name' => 'TestAcc',
            'AccountNumber' => '123456'
        };
        
        Test.startTest();
        try {
            AccountController.insertAccount(accData);
            System.assert(false, 'Expected exception was not thrown');
        } catch (AuraHandledException e) {
            System.assert(e.getMessage().contains('cannot exceed 5 digits'));
        }
        Test.stopTest();
    }
    
    @isTest
    static void testUpdateAccountSuccess() {
        // Create test account
        Account acc = new Account(Name = 'Original', AccountNumber = '111');
        insert acc;
        
        // Prepare update data
        Map<String, Object> accData = new Map<String, Object>{
            'Id' => acc.Id,
            'Name' => 'Updated',
            'AccountNumber' => '222',
            'BillingStreet' => '456 Oak Ave',
            'Description' => 'Updated Description'
        };
        
        Test.startTest();
        AccountController.updateAccount(accData);
        Test.stopTest();
        
        // Verify
        Account updatedAcc = [SELECT Name, AccountNumber, BillingStreet, Description 
                              FROM Account WHERE Id = :acc.Id];
        System.assertEquals('Updated', updatedAcc.Name);
        System.assertEquals('222', updatedAcc.AccountNumber);
        System.assertEquals('456 Oak Ave', updatedAcc.BillingStreet);
        System.assertEquals('Updated Description', updatedAcc.Description);
    }
    
    @isTest
    static void testUpdateAccountInvalidName() {
        Account acc = new Account(Name = 'TestAcc', AccountNumber = '111');
        insert acc;
        
        Map<String, Object> accData = new Map<String, Object>{
            'Id' => acc.Id,
            'Name' => 'AB',
            'AccountNumber' => '222'
        };
        
        Test.startTest();
        try {
            AccountController.updateAccount(accData);
            System.assert(false, 'Expected exception was not thrown');
        } catch (AuraHandledException e) {
            System.assert(e.getMessage().contains('between 4 and 15 characters'));
        }
        Test.stopTest();
    }
}