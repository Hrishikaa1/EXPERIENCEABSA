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
@AuraEnabled(cacheable=true)
public static Map<String, List<String>> getPicklistValues() {
    Map<String, List<String>> picklistValues = new Map<String, List<String>>();

    // Describe the Director__c object
    Schema.DescribeSObjectResult objDescribe = Director__c.SObjectType.getDescribe();
    Map<String, Schema.SObjectField> fields = objDescribe.fields.getMap();

    // List of picklist fields you want
    List<String> fieldNames = new List<String>{
        'Relationship__c',
        'Share_structure__c',
        'Account_Role__c',
        'Status__c'
    };

    for (String fieldName : fieldNames) {
        List<String> values = new List<String>();
        for (Schema.PicklistEntry entry : fields.get(fieldName).getDescribe().getPicklistValues()) {
            values.add(entry.getLabel());
        }
        picklistValues.put(fieldName, values);
    }

    return picklistValues;
}

   @AuraEnabled
public static Director__c saveDirectorRecord(Map<String, Object> newDirector) {
    Director__c dir = new Director__c();

    if (newDirector.containsKey('Name')) dir.Name = (String)newDirector.get('Name');
    if (newDirector.containsKey('Name_ID__c')) dir.Name_ID__c = (String)newDirector.get('Name_ID__c');
    if (newDirector.containsKey('Address__c')) dir.Address__c = (String)newDirector.get('Address__c');
    if (newDirector.containsKey('Relationship__c')) dir.Relationship__c = (String)newDirector.get('Relationship__c');
    if (newDirector.containsKey('Share_structure__c')) dir.Share_structure__c = (String)newDirector.get('Share_structure__c');
    if (newDirector.containsKey('Account_Role__c')) dir.Account_Role__c = (String)newDirector.get('Account_Role__c');
    if (newDirector.containsKey('Status__c')) dir.Status__c = (String)newDirector.get('Status__c');

    insert dir;
    return dir;
}
}