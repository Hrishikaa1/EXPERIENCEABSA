public with sharing class DirectorController {
    @AuraEnabled(cacheable=true)
    public static List<Director__c> getDirectorRecords() {
        return [
            SELECT Id, Name, Name_ID__c, Address__c, Relationship__c,
                   Share_structure__c, Account_Role__c, Status__c
            FROM Director__c
            LIMIT 4
        ];
    }
}