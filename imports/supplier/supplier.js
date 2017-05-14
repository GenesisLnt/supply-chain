import './supplier.html';
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
Template.supplier.onRendered(function() {

var addr=localStorage.getItem("address"); 
web3.eth.defaultAccount = web3.eth.accounts[id]; 
  var contract=setcontract(addr);
  var shipmentId = localStorage.getItem('ship_id');
  console.log(shipmentId+" "+contract.toString());
var suplierData = contract.getShipmentDetails1(shipmentId);
  var supplierData1=contract.getShipmentDetails2(shipmentId)
console.log(suplierData+" "+supplierData1);
  
  $("#shipmentId").val(shipmentId);
  $("#orderNo").val(localStorage.getItem('0'));
  $("#temparature").val(localStorage.getItem('1'));
  $("#description").val(localStorage.getItem('2'));
  $("#amount").val(20);
  // $("#wholeseller").val(localStorage.getItem('4'));
  $("#date-picker").val(localStorage.getItem('5'));
  // $("#freight").val(localStorage.getItem('6'));

  $('.input-group').find('label').addClass('active');
       
});


var setcontract=function(contract_address){
  var contract_instance=web3.eth.contract(contract_abi).at(contract_address);
  return contract_instance;
}

var contract_addr=null;

Template.supplier.events({
   'click #supplier-create' : function(event){
web3.eth.defaultAccount = web3.eth.accounts[id];
    var addr=localStorage.getItem("address");  
  var contract=setcontract(addr);
  // contract.signContract($("#shipmentId").val());

  localStorage.setItem('sign',true);

    if(contract_addr==null){
      deployContract(id,function(data){
      contract_addr=data;
    });
    }
    getTempData();
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
                        if(data.temp>20){
                          $('.temp-type').removeClass('green-temp').addClass('red-temp animated flash');
                          var d = parseInt($('#balance').find('a').html());
                          d=d+parseInt($('#amount').val());
                          $('#balance').find('a').html(d);
                        }
                  }
                });
            },5000);
}