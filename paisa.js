const axios = require('axios');

class paisa {
  constructor(app_id) {
    this.app_id = app_id;
    this.map = {'AED':'د.إ','AFN':'؋','ALL':'L','AMD':'AMD','ANG':'ƒ','AOA':'Kz',
    'ARS':'$','AUD':'$','AWG':'ƒ','AZN':'₼','BAM':'KM','BBD':'$','BDT':'৳',
    'BGN':'лв','BHD':'.د.ب','BIF':'FBu','BMD':'$','BND':'$','BOB':'Bs.',
    'BRL':'Bs.','BSD':'$','BTC':'฿','BTN':'Nu.','BWP':'P','BYN':'p.','BZD':'BZ$',
    'CAD':'$','CDF':'FC','CHF':'Fr.','CLF':'C$','CLP':'$','CNH':'¥','CNY':'¥',
    'COP':'$','CRC':'₡','CUC':'$','CUP':'₱','CVE':'$','CZK':'Kč','DJF':'Fdj',
    'DKK':'kr','DOP':'RD$','DZD':'دج','EGP':'£','ERN':'Nfk','ETB':'Br','EUR':'€',
    'FJD':'$','FKP':'£','GBP':'£','GEL':'₾','GGP':'£','GHS':'GH₵','GIP':'£','GMD':'D',
    'GNF':'FG','GTQ':'Q','GYD':'$','HKD':'$','HNL':'L','HRK':'kn','HTG':'G',
    'HUF':'Ft','IDR':'Rp','ILS':'₪','IMP':'£','INR':'₹','IQD':'ع.د','IRR':'﷼',
    'ISK':'kr','JEP':'£','JMD':'J$','JOD':'JD','JPY':'¥','KES':'Ksh','KGS':'лв',
    'KHR':'៛','KMF':'CF','KPW':'₩','KRW':'₩','KWD':'KD','KYD':'$','KZT':'₸',
    'LAK':'₭','LBP':'£','LKR':'₨','LRD':'$','LSL':'M','LYD':'LD','MAD':'MAD',
    'MDL':'lei','MGA':'Ar','MKD':'ден','MMK':'K','MNT':'₮','MOP':'MOP$',
    'MRO':'UM','MUR':'₨','MVR':'Rf','MWK':'MK','MXN':'$','MYR':'RM','MZN':'MT',
    'NAD':'$','NGN':'₦','NIO':'C$','NOK':'kr','NPR':'₨','NZD':'$','OMR':'﷼',
    'PAB':'B/.','PEN':'S/.','PGK':'K','PHP':'₱','PKR':'₨','PLN':'zł','PYG':'Gs',
    'QAR':'﷼','RON':'lei','RSD':'Дин.','RUB':'₽','RWF':'R₣','SAR':'﷼','SBD':'$',
    'SCR':'₨','SDG':'ج.س.','SEK':'kr','SGD':'$','SHP':'£','SLL':'Le','SOS':'S',
    'SRD':'$','SSP':'£','STD':'Db','SVC':'$','SYP':'£','SZL':'E','THB':'฿',
    'TJS':'SM','TMT':'T','TND':'د.ت','TOP':'T$','TRY':'₺','TTD':'TT$','TWD':'NT$',
    'TZS':'TSh','UAH':'₴','UGX':'USh','USD':'$','UYU':'$U','UZS':'лв','VEF':'Bs',
    'VND':'₫','VUV':'VT','WST':'WS$','XAF':'FCFA','XAG':'ozt','XAU':'ozt',
    'XCD':'$','XDR':'SDR','XOF':'CFA','XPD':'ozt','XPF':'₣','XPT':'ozt','YER':'﷼',
    'ZAR':'R','ZMW':'ZK','ZWL':'$'};
  }

  convert(from, to, amount, symbol) {
    if(!map[to] || !map[from]) { console.error("Invalid currency used. Must be contained by the library"); }
    if(amount <= 0) { console.error("Invalid amount used. Must be greater than 0"); }
    if(typeof(symbol) !== "boolean") { console.error("Invalid Symbol flag used. Must be either true or false"); }

    axios.get("https://openexchangerates.org/api/latest.json?app_id="+this.app_id)
    .then(response => {
      this.rates = response.data.rates;
      this.base = response.data.base;
      const value = (this.rates[to]/this.rates[from])*amount;
      return symbol ? this.map[to] + value : value;
    })
    .catch(error => {
      console.error("Couldn't fetch exchange rates: "+error);
    });
  }


}
