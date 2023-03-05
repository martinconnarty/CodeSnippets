//getIPsFromCIDR will generate an array of IP addresss from a provided CIDR Range
getIPsFromCIDR(net) {
                ipAddresses=[];
                const regexp= /^(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])\.(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])\.(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])\.(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])\/(\d{1,2})$/;
                const match=net.match(regexp);
                let a=`${match[1]}`;
                let b=`${match[2]}`;
                let c=`${match[3]}`;
                let d=`${match[4]}`;
                    
                let mask=`${match[5]}`;
                let octetmod=mask%8;
                let octetnumber=Math.floor(mask/8);
                let ipaddress="";
                let octect="";
                
                if (mask<=8)
                {
                    octetnumber=0;
                }
                
                if (octetnumber==3){
                  octet=a;
                }
                else if (octetnumber==2){
                  octet=b;
                }
                else if (octetnumber==1){
                  octet=c;
                }
                else if (octetnumber==0){
                  octet=d;
                }           
            
                block=(2**(8-octetmod));
                numberofblocks=Math.floor(octet/block);
                network=block*numberofblocks;
                firsthost=network+1;
                broadcast=network+(block-1);
                //Fourth octet
                if (octetnumber==3){                    
                    for (i=firsthost;i<broadcast;i++){
                            ipaddress=`${a}.${b}.${c}.${i}`; 
                            ipAddresses.push(ipaddress);
                    }                    
                }
                //Third octet
                else if (octetnumber==2){
                    for (i=firsthost;i<=broadcast;i++){
                        for (j=0;j<255;j++){
                            ipaddress=`${a}.${b}.${i}.${j}`;                      
                            ipAddresses.push(ipaddress);                         
                        }
                    }
                    
                }
                //Second octet
                else if (octetnumber==3){
                    for (i=firsthost;i<broadcast;i++){
                        for (j=0;j<255;j++){
                            for (k=0;k<255;k++){
                            ipaddress=`${a}.${i}.${j}.${k}`;
                            ipAddresses.push(ipaddress);
                        }
                        }
                    }      
                }
                //First octet
                else if (octetnumber==0){                    
                    for (i=firsthost;i<broadcast;i++){
                        for (j=0;j<255;j++){
                            for (k=0;k<255;k++){
                                for (l=0;l<255;l++){                                
                                ipaddress=`${i}.${j}.${k}.${l}`;
                                ipAddresses.push(ipaddress);
                            }
                        }
                        }
                    }
                }
        return ipAddresses
            }
