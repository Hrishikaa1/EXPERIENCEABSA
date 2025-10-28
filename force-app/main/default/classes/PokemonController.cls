public with sharing class PokemonController {
    
    @AuraEnabled(cacheable=false)
    public static Map<String, Object> getRandomPokemon() {
        try {
            Integer randomId = Integer.valueOf(Math.floor(Math.random() * 1025)) + 1;

            Http http = new Http();
            HttpRequest req = new HttpRequest();
            req.setEndpoint('https://pokeapi.co/api/v2/pokemon/ditto' + randomId);
            req.setMethod('GET');

            HttpResponse res = http.send(req);

            if (res.getStatusCode() == 200) {
                return (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
            } else {
                throw new CalloutException('Error: ' + res.getStatus());
            }

        } catch (Exception e) {
            throw new AuraHandledException('Failed to fetch random Pokémon: ' + e.getMessage());
        }
    }
}