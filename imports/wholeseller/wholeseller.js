import './wholeseller.html';
import {
    Template
} from 'meteor/templating';
import { deployContract,contract_abi } from '../api/supply_contract.js';
import Web3 from 'web3';
import moment from 'moment';
var node_ip = 'http://10.42.0.77:8080/';
var id =0;
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.defaultAccount = web3.eth.accounts[id];
var caddress;
var setContract = function(contract_address){
var contract_instance = web3.eth.contract(contract_abi).at(contract_address);
return contract_instance;
}
// console.log(web3.fromWei(web3.eth.getBalance(web3.eth.coinbase)).toString());
// web3.eth.sendTransaction({'from':web3.eth.coinbase,'to':web3.eth.accounts[id],'value':web3.toWei(50,'ether')});



Template.wholeseller.onRendered(function() {
            // $('#date-picker').datepicker({
            //     format: 'yyyy-MM-dd',
            //      onClose: function () {
            //         $(this).prev('.label-anim').addClass('active');
            //     }
            // });

            
       
});


function getTempData(){
    var tempTimer = setInterval(function(){
                $('#balance a').text(web3.fromWei(web3.eth.getBalance(web3.eth.accounts[id])));

                $.ajax({
                    url: node_ip+'setTemp?id=1',
                    type: 'GET',
                    dataType: 'JSON',
                    success: function(data){
                        var date = moment().format('hh:mm:ss')
                        $('.notificationtable tbody').append('<tr><td>'+data.block+'</td><td>'+data.temp+'</td><td>'+date.toString()+'</td><td>'+data.tx+'</td></tr>');
                        $('.temp-type').html(data.temp+ 'c');
                  }
                });
            },5000);
}

var setcontract=function(contract_address){
  var contract_instance=web3.eth.contract(contract_abi).at(contract_address);
  return contract_instance;
}

var contract_addr=null;

Template.wholeseller.events({
   'click #supplier-create' : function(event){
    if(contract_addr==null){
      deployContract(id,function(data){
      contract_addr=data;
    });
    }

  var addr=localStorage.getItem("address");  
  var contract=setcontract(addr);
  var shipmentId=$("#shipmentId").val();
  var orderNo=$("#orderNo").val();
  var temperature=$("#temparature").val();
  var descrp=$("#description").val();
  var amount =$("#amount").val();
  var buyer =$("#wholeseller").val();
  var date =$("#date-picker").val();
  var freight =$("#freight").val();

  localStorage.setItem('0',orderNo);
  localStorage.setItem('1',temperature);
  localStorage.setItem('2',descrp);
  localStorage.setItem('3',amount);
  localStorage.setItem('4',buyer);
  localStorage.setItem('5',date);
  localStorage.setItem('6',freight);

//   console.log(shipmentId +" :: shipmentId"+ orderNo +":: orderNo"+ "temperature "+temperature+ "descrp ::" + descrp+"amount "+amount+"date"+date);

//   contract.setShipment(orderNo+':'+temperature+':'+descrp+':'+buyer+':'+freight+':'+amount+':'+date,shipmentId,{gas:5000000}); 
  contract.setOrderDetails(shipmentId,orderNo,temperature);
  contract.setBuyer(descrp,buyer,freight);
  contract.setOrderValue(amount,date);
  localStorage.setItem('ship_id',shipmentId);
//   console.log(shipmentId+ contract.getShipmentDetails1(shipmentId) +contract.getShipmentDetails2(shipmentId));
  
var signTimer = setInterval(function(){
var addr=localStorage.getItem("address");  
  var contract=setcontract(addr);
  var signed = contract.getShipmentDetails2(shipmentId)[4];
  if(signed){
    getTempData();
    // moveTruck();
    clearInterval(signTimer);
  }
},2000);

   }
});

function moveTruck(){
    var StatusS=$('.showing-running').css('display');
      if(StatusS=='none'){
        $('.showing-running').fadeIn();
        setTimeout(function(){
          $('.showing-running').fadeOut('fadeOut');
          $('.showing-running .outImage').addClass('zoomOut');
          setTimeout(function(){
           $('.moving-truck').addClass('move-element');
          }, 1000);
          // $('body,html').animate({scrollTop: 1000}, 800);
        }, 3000);
      }
      $('.show-shipment').show();
	event.preventDefault();
}