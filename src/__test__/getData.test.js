
//import { expect, test} from '@jest/globals'
const {getData} = require('../scripts/utils/index.js')

    
  
test('is not url', async ()=>{
   let error_m = '';
   try {
     let data = await getData('httpafankdndas');
   } catch (error) {
    error_m = error.message
   }
   expect(error_m).toBe('Is not valid')
});
 