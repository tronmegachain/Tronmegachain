contractAddress = 'TKfSHZcK2Rn5rdJy3VgQrzikSP4TagDAiM'
var tronWeb;
var istronWeb = false;
var myContract;
var address;
var base_url;



var currentaddress;
$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    address = urlParams.get('ref');
    // console.log('URl : ' + address);
    base_url = window.location.origin;
    // console.log(base_url);
});
window.onload = async function () {
    setTimeout(async function () {
        Swal.fire({
            title: "Loading...",
            text: "Checking Tronlink Connection",
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
            onClose: () => {
                if (istronWeb == true) {
                    Swal.fire({
                        position: 'middle',
                        icon: 'success',
                        title: 'TronLink is Connected',
                        showConfirmButton: false,
                        timer: 1300
                    });
                } else if (istronWeb == false) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        text: 'Please Check TronLink Connection and make sure you are connected to correct network!',
                    });
                }
            }
        });
        if (contractAddress) {
            tronWeb = window.tronWeb;
            console.log("tronWeb : ", tronWeb);
            console.log("tronweb is successfully fetched from window");

            try {
                currentaddress = await tronWeb.address.fromHex((await tronWeb.trx.getAccount()).address.toString());
                console.log("currentaddress-AUTO : ", currentaddress);
                myContract = await tronWeb.contract().at(contractAddress);
                istronWeb = true;
                Swal.close();
                console.log('Contract address : ', contractAddress);

                document.getElementById('currentuseraddress').innerHTML = currentaddress;
                var balance = await tronWeb.trx.getBalance(currentaddress);
                balance = balance/1000000;

                document.getElementById("currentuserbalance").innerHTML = balance + " TRX";


                let myLink = `${base_url}/?ref=${currentaddress}`;
                reference_url(myLink);
        
                display_all();
                reference();
                plan_validity();
                getcontractbalance();

            } catch {
                console.log("Tronweb not defined");
                istronWeb = false;
                Swal.close();
            }
        } else {
            Swal.close();
            alert("Contract address not defined");
        }
    }, 1000);



    //  ---------------------------------  Invest  -------------------------------------------------


    //  ---------------------------------  Diamond  [Forever Plan] -------------------------------------------------


    input_panel_1 = document.getElementById('input_panel_1');
    button_panel_1 = document.getElementById('button_panel_1');
    var totalinvestedamount = document.getElementById('contractbalance');

    async function getcontractbalance(){
        var investedamount = await myContract.totalcontractamount().call();
        investedamount = investedamount/1000000;
        totalinvestedamount.innerHTML = investedamount + " TRX";
    }

    button_panel_1.onclick = async function () {
        console.log('in button 1 on click')
        if (input_panel_1.value == 0) {
            Swal.fire({
                icon: 'info',
                title: 'Missing Something ?',
                text: 'Please Enter Some Value'
            });
        } else if (input_panel_1.value < 100) {
            Swal.fire({
                icon: 'warning',
                title: 'Please Enter more than 100 TRX',
            });
        } else if (await myContract.is_valid_time_p1().call() == false) {
            let next_time = Math.trunc(((await myContract.l_l1().call()).toNumber() + 86400 - Math.floor(Date.now() / 1000)) / 3600);
            Swal.fire({
                icon: 'info',
                title: 'Daily Invest Period Over',
                text: `You can invest after ${next_time} hours from now !`
            })
        } else {
            Swal.fire({
                title: 'Diamond Plan',
                text: `You will be investing ${input_panel_1.value}TRX`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Invest !'
            }).then(async (result) => {
                if (result.value) {
                    await myContract.invest_panel1().send({
                        shouldPollResponse: true,
                        callValue: tronWeb.toSun(input_panel_1.value)
                    }).then((result) => {
                        if (result) {
                            console.log('Transaction of ' + input_panel_1.value + ' is confirmed');
                            Swal.fire({
                                icon: 'success',
                                title: 'Success !',
                                text: 'Your transaction is Confirmed on Tronscan',
                            })
                        }
                        display_all();

                    }).catch((err) => {
                        if (err) {
                            console.log(err);
                            Swal.fire({
                                icon: 'error',
                                title: 'error',
                                text: `${err}`
                            });
                        }
                    })
                }
            })
        }
    }//button.onclick


    //  ------------------------------- Platinum 2% for 45 days -------------------------------------------------

    input_panel_2 = document.getElementById('input_panel_2');
    button_panel_2 = document.getElementById('button_panel_2');

    button_panel_2.onclick = async function () {
        if (input_panel_2.value == 0) {
            Swal.fire({
                icon: 'info',
                title: 'Missing Something ?',
                text: 'Please Enter Some Value'
            });
        } else if (input_panel_2.value < 100) {
            Swal.fire({
                icon: 'warning',
                title: 'Please Enter more than 100 TRX',
            });
        } else if (await myContract.is_valid_time_p2().call() == false) {
            let next_time = Math.trunc(((await myContract.l_l2().call()).toNumber() + 86400 - Math.floor(Date.now() / 1000)) / 3600);
            Swal.fire({
                icon: 'info',
                title: 'Daily Invest Period Over',
                text: `You can invest after ${next_time} hours from now !`
            })
        } else {
            Swal.fire({
                title: 'Platinum Plan',
                text: `You will be investing ${input_panel_2.value}TRX`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Invest !'
            }).then(async (result) => {
                if (result.value) {
                    await myContract.invest_panel2().send({
                        shouldPollResponse: true,
                        callValue: tronWeb.toSun(input_panel_2.value)
                    }).then((result) => {
                        if (result) {
                            console.log('Transaction of ' + input_panel_2.value + ' is confirmed');
                            Swal.fire({
                                icon: 'success',
                                title: 'Success !',
                                text: 'Your transaction is Confirmed on Tronscan',
                            })
                        }
                        display_all();
                    }).catch((err) => {
                        if (err) {
                            console.log(err);
                            Swal.fire({
                                icon: 'error',
                                title: 'error',
                                text: `${err}`
                            });
                        }
                    })
                }
            })
        }
    }//button.onclick

    // ---------------------------------  Gold 2.5% for 25 days -------------------------------------------

    input_panel_3 = document.getElementById('input_panel_3');
    button_panel_3 = document.getElementById('button_panel_3');

    button_panel_3.onclick = async function () {
        if (input_panel_3.value == 0) {
            Swal.fire({
                icon: 'info',
                title: 'Missing Something ?',
                text: 'Please Enter Some Value'
            });
        } else if (input_panel_3.value < 100) {
            Swal.fire({
                icon: 'warning',
                title: 'Please Enter more than 100 TRX',
            });
        } else if (await myContract.is_valid_time_p3().call() == false) {
            let next_time = Math.trunc(((await myContract.l_l3().call()).toNumber() + 86400 - Math.floor(Date.now() / 1000)) / 3600);
            Swal.fire({
                icon: 'info',
                title: 'Daily Invest Period Over',
                text: `You can invest after ${next_time} hours from now !`
            })
        } else {
            Swal.fire({
                title: 'Gold Plan',
                text: `You will be investing ${input_panel_3.value}TRX`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Invest !'
            }).then(async (result) => {
                if (result.value) {
                    await myContract.invest_panel3().send({
                        shouldPollResponse: true,
                        callValue: tronWeb.toSun(input_panel_3.value)
                    }).then((result) => {
                        if (result) {
                            console.log('Transaction of ' + input_panel_3.value + ' is confirmed');
                            Swal.fire({
                                icon: 'success',
                                title: 'Success !',
                                text: 'Your transaction is Confirmed on Tronscan',
                            })
                        }
                        display_all();
                    }).catch((err) => {
                        if (err) {
                            console.log(err);
                            Swal.fire({
                                icon: 'error',
                                title: 'error',
                                text: `${err}`
                            });
                        }
                    })
                }
            })
        }
    }//button.onclick




    // ----------------------------  plan expiry  --------------------------------
    async function plan_validity() {
        console.log('in validity')
        let is_plan_completed_p2 = (await myContract.is_plan_completed_p2().call()).toString();
        let is_plan_completed_p3 = (await myContract.is_plan_completed_p3().call()).toString();


        if (is_plan_completed_p2 == true) {
            await myContract.plan_completed_p2().send().catch((err) => {
                console.log(err);
            }).then(async () => {
                display_all()
            })
        }
        if (is_plan_completed_p3 == true) {
            await myContract.plan_completed_p3().send().catch((err) => {
                console.log(err);
            }).then(async () => {
                display_all()
            })
        }
    }





    //  -------------------------  User info section  ------------------------------     

    total_invested_amount = document.getElementById('total_invested_amount');

    total_referal_profit = document.getElementById('total_referal_profit');
    panel_1_inv_amt = document.getElementById('panel_1_inv_amt');
    panel_2_inv_amt = document.getElementById('panel_2_inv_amt');
    panel_3_inv_amt = document.getElementById('panel_3_inv_amt');

    ref_level_1 = document.getElementById('ref_level_1');
    ref_level_2 = document.getElementById('ref_level_2');
    ref_level_3 = document.getElementById('ref_level_3');
    ref_level_4 = document.getElementById('ref_level_4');


    async function display_all() {

        profit_per_sec();
        console.log(' Is Plan Completed', (await myContract.is_plan_completed_p2().call()));
        console.log('in display')
        let p1p = (await myContract.panel_1(currentaddress).call())['invested_amount'];
        let p2p = (await myContract.panel_2(currentaddress).call())['invested_amount'];
        let p3p = (await myContract.panel_3(currentaddress).call())['invested_amount'];

        let referal_profit = document.getElementById('total_referal_profit');
        let total_referal_profit = ((await myContract.user_info(currentaddress).call())['referal_profit'] / 1000000).toString();

        panel_1_inv_amt.innerHTML = `${p1p / 1000000} TRX`;
        panel_2_inv_amt.innerHTML = `${p2p / 1000000} TRX`;
        panel_3_inv_amt.innerHTML = `${p3p / 1000000} TRX`;

        total_invested_amount.innerHTML = `${((await myContract.user_info(currentaddress).call())['total_invested_amount'] / 1000000).toString()} TRX`;

        referal_profit.innerHTML = `${total_referal_profit} TRX`;


        // Referal Profit wd
        referal_profit_wd = document.getElementById('referal_profit_wd');
        referal_profit_wd.innerHTML = ((await myContract.user_info(currentaddress).call())['referal_profit'] / 1000000).toString();

        // Referal count
        ref_level_1.innerHTML = ((await myContract.refer_info(currentaddress).call())['level_1']).toString()
        ref_level_2.innerHTML = ((await myContract.refer_info(currentaddress).call())['level_2']).toString()
        ref_level_3.innerHTML = ((await myContract.refer_info(currentaddress).call())['level_3']).toString()
        ref_level_4.innerHTML = ((await myContract.refer_info(currentaddress).call())['level_4']).toString()



        // reference();

    }// display_all()


    // ------------------------------------  Withdraw Sections  ----------------------------------------

    //  ------------------------------------  Diamond   -----------------------------------------

    input_panel_1_withdraw = document.getElementById('input_panel_1_withdraw');
    button_panel_1_withdraw = document.getElementById('button_panel_1_withdraw');

    button_panel_1_withdraw.onclick = async function () {
        if (input_panel_1_withdraw.value == 0) {
            Swal.fire({
                icon: 'info',
                title: 'Missing Something ?',
                text: 'Please Enter Some Value'
            });
        } else if (input_panel_1_withdraw.value > ((await myContract.current_profit_p1().call()) / 1000000)) {
            Swal.fire({
                icon: 'warning',
                text: 'Please enter amount less than your profit',
            })
        } else {
            Swal.fire({
                title: 'Withdraw Profit [Diamond Plan]',
                text: `You will be withdrawing ${input_panel_1_withdraw.value} TRX`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Withdraw'
            }).then(async (result) => {
                if (result.value) {
                    await myContract.withdraw_profit_panel1((input_panel_1_withdraw.value) * (1000000)).send().catch(
                        (err) => {
                            if (err) {
                                console.log(err);
                                Swal.fire({
                                    icon: 'error',
                                    title: 'error',
                                    text: `${err}`
                                });
                            }
                        }).then((result) => {
                            if (result) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Success !',
                                    text: 'Withdraw Succesful !',
                                });
                                console.log('Transaction of ' + input_panel_1_withdraw.value + ' is confirmed');
                            }

                            display_all();
                        })
                }
            })
        }
    }//button_panel_1.onclick

    //  ------------------------------------  Platinum Withdraw  ------------------------------------------    

    input_panel_2_withdraw = document.getElementById('input_panel_2_withdraw');
    button_panel_2_withdraw = document.getElementById('button_panel_2_withdraw');

    button_panel_2_withdraw.onclick = async function () {
        if (input_panel_2_withdraw.value == 0) {
            Swal.fire({
                icon: 'info',
                title: 'Missing Something ?',
                text: 'Please Enter Some Value'
            });
        } else if (input_panel_2_withdraw.value >= ((await myContract.current_profit_p2().call()) / 1000000)) {
            Swal.fire({
                icon: 'warning',
                text: 'Please enter amount less than your profit',
            })
        } else {
            Swal.fire({
                title: 'Withdraw Profit [Platinum Plan]',
                text: `You will be withdrawing ${input_panel_2_withdraw.value} TRX`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Withdraw'
            }).then(async (result) => {
                if (result.value) {
                    await myContract.withdraw_profit_panel2((input_panel_2_withdraw.value) * (1000000)).send().catch((err) => {
                        if (err) {
                            console.log(err);
                            Swal.fire({
                                icon: 'error',
                                title: 'error',
                                text: `${err}`
                            });
                        }
                    }).then((result) => {
                        if (result) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success !',
                                text: 'Withdraw Succesful !',
                            });
                            console.log('Transaction of ' + input_panel_2_withdraw.value + ' is confirmed');
                        }
                        display_all();
                    })
                }
            })
        }
    }//button_panel_2.onclick

    //  ------------------------------------  Gold  Withdraw -------------------------------------------

    input_panel_3_withdraw = document.getElementById('input_panel_3_withdraw');
    button_panel_3_withdraw = document.getElementById('button_panel_3_withdraw');

    button_panel_3_withdraw.onclick = async function () {
        if (input_panel_3_withdraw.value == 0) {
            Swal.fire({
                icon: 'info',
                title: 'Missing Something ?',
                text: 'Please Enter Some Value'
            });
        } else if (input_panel_3_withdraw.value >= ((await myContract.current_profit_p3().call()) / 1000000)) {
            Swal.fire({
                icon: 'warning',
                text: 'Please enter amount less than your profit',
            })
        } else {
            Swal.fire({
                title: 'Withdraw Profit [Gold Plan]',
                text: `You will be withdrawing ${input_panel_3_withdraw.value} TRX`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Withdraw'
            }).then(async (result) => {
                if (result.value) {
                    await myContract.withdraw_profit_panel3((input_panel_3_withdraw.value) * (1000000)).send().catch((err) => {
                        if (err) {
                            console.log(err);
                            Swal.fire({
                                icon: 'error',
                                title: 'error',
                                text: `${err}`
                            });
                        }
                    }).then((result) => {
                        if (result) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success !',
                                text: 'Withdraw Succesful !',
                            });
                            console.log('Transaction of ' + input_panel_3_withdraw.value + ' is confirmed');
                        }
                        display_all();
                    })
                }
            })
        }
    }//button_panel_3.onclick


    //  ------------------------------------------------  Referal Profit  ------------------------------------

    input_referal_profit_withdraw = document.getElementById('input_referal_profit_withdraw');
    button_referal_profit_withdraw = document.getElementById('button_referal_profit_withdraw');

    button_referal_profit_withdraw.onclick = async function () {
        if (input_referal_profit_withdraw.value == 0) {
            Swal.fire({
                icon: 'info',
                title: 'Missing Something ?',
                text: 'Please Enter Some Value'
            });
        } else if (input_referal_profit_withdraw.value > ((await myContract.user_info(currentaddress).call())['referal_profit']).toNumber() / 1000000) {
            Swal.fire({
                icon: 'warning',
                text: 'Please enter amount less than your profit',
            })
        } else {
            Swal.fire({
                title: 'Withdraw Referal Profit',
                text: `You will be withdrawing ${input_referal_profit_withdraw.value} TRX`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Withdraw'
            }).then(async (result) => {
                if (result.value) {
                    await myContract.referal_withdraw((input_referal_profit_withdraw.value) * (1000000)).send().catch((err) => {
                        if (err) {
                            console.log(err);
                            Swal.fire({
                                icon: 'error',
                                title: 'error',
                                text: `${err}`
                            });
                        }
                    }).then((result) => {
                        if (result) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success !',
                                text: 'Withdraw Succesful !',
                            });
                            console.log('Transaction of ' + input_referal_profit_withdraw.value + ' is confirmed');
                        }
                        display_all();
                    })
                }
            })
        }
    }//button_referal_profit_withdraw.onclick



    //  ------------------------------------  Platinum Withdraw all  ----------------------------------------

    button_panel_2_withdraw_all = document.getElementById('button_panel_2_withdraw_all');

    button_panel_2_withdraw_all.onclick = async function () {
        if ((await myContract.is_plan_completed_p2().call()) == false) {
            Swal.fire({
                icon: 'warning',
                text: 'You can withdraw Invested + Remaining Profit after Plan Completes',
            })
        } else {
            Swal.fire({
                title: 'Withdraw Profit + Invested Platinum Plan',
                text: `You will be withdrawing Invested and Profit Amount `,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Withdraw'
            }).then(async (result) => {
                if (result.value) {
                    await myContract.withdraw_all_p2().send().catch((err) => {
                        if (err) {
                            console.log(err);
                            Swal.fire({
                                icon: 'error',
                                title: 'error',
                                text: `${err}`
                            });
                        }
                    }).then((result) => {
                        if (result) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success !',
                                text: 'Withdraw Succesful !',
                            });
                            console.log('Transaction is confirmed');
                        }
                        display_all();
                    })
                }
            })
        }
    }//button_panel_4.onclick


    //  ------------------------------------  Gold withdraw all  ----------------------------------------

    button_panel_3_withdraw_all = document.getElementById('button_panel3_withdraw_all');

    button_panel_3_withdraw_all.onclick = async function () {
        if ((await myContract.is_plan_completed_p2().call()) == false) {
            Swal.fire({
                icon: 'warning',
                text: 'You can withdraw Invested + Remaining Profit after Plan Completes',
            })
        } else {
            Swal.fire({
                title: 'Withdraw Profit + Invested Gold Plan',
                text: `You will be withdrawing  Invested + Profit amount`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Withdraw'
            }).then(async (result) => {
                if (result.value) {
                    await myContract.withdraw_all_p3().send().catch((err) => {
                        if (err) {
                            console.log(err);
                            Swal.fire({
                                icon: 'error',
                                title: 'error',
                                text: `${err}`
                            });
                        }
                    }).then((result) => {
                        if (result) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success !',
                                text: 'Withdraw Succesful !',
                            });
                            console.log('Transaction is confirmed');
                        }
                        display_all();
                    })
                }
            })
        }
    }//button_panel_4.onclick



    //    ----------------------------------------------  Reference -----------------------------------------
    async function reference() {
        
        if (address == null) {
            // console.log('its a null');
            let a = (await myContract.user_info(currentaddress).call())['referred_by'];
            let res = await tronWeb.address.fromHex((a.toString()));
            // console.log(res);
            if (res == "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb") {
                document.getElementById('referred_by').value = 0;
            } else {
                document.getElementById('referred_by').value = res;
            }
        } else {
            let a = (await myContract.user_info(currentaddress).call())['referred_by'];
            res = await tronWeb.address.fromHex((a.toString()));
            if (res == "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb") {
                await myContract.refer(address).send().catch((err) => {
                    console.log(err);
                }).then(async () => {
                    let a = (await myContract.user_info(currentaddress).call())['referred_by'];
                    res = await tronWeb.address.fromHex((a.toString()));
                    if (res == "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb") {
                        document.getElementById('referred_by').value = 0;
                    } else {
                        document.getElementById('referred_by').value = res;
                    }
                    display_all();
                });
            } else {
                document.getElementById('referred_by').value = res;
                display_all();
            }

        }

    }//reference()

    ref_link = document.getElementById('my_link');
    function reference_url(myLink) {
        ref_link.value = myLink;
    }//reference_url()

    document.getElementById('copy_button').onclick = async function () {
        ref_link.select();
        ref_link.setSelectionRange(0, 99999);
        document.execCommand("copy");
        alert("The copied text is: " + ref_link.value);
    }//copy_button


    var profit_1 = document.getElementById('profit_p1_ps');
    var profit_2 = document.getElementById('profit_p2_ps');
    var profit_3 = document.getElementById('profit_p3_ps');

    var total_profit = document.getElementById('total_profit');

    async function profit_per_sec() {

        // -----------------------   Panel - 1  -----------------------------------------
        var invested_amt = ((await myContract.panel_1(currentaddress).call())['invested_amount']).toNumber();
        var profit_withdrawn = ((await myContract.panel_1(currentaddress).call())['profit_withdrawn']).toNumber();
        var start_time = ((await myContract.panel_1(currentaddress).call())['start_time']).toNumber();

        var p1 = 0;
        var p2 = 0;
        var p3 = 0;

        setInterval(
            function p_p_s_p1() {
                let now = Math.floor(Date.now() / 1000);
                let p_p1;

                p_p1 = ( (invested_amt * 1 * (now - start_time))/(100 * 86400)) - profit_withdrawn;
                profit_1.innerHTML = (p_p1 / 1000000).toFixed(4);
                p1 = (p_p1 / 1000000).toFixed(4);

            }, 1000);

        // -----------------------   Panel - 2  -----------------------------------------
        var profit2 = ((await myContract.panel_2(currentaddress).call())['profit']).toNumber();
        var profit_withdrawn2 = ((await myContract.panel_2(currentaddress).call())['profit_withdrawn']).toNumber();
        var start_time2 = ((await myContract.panel_2(currentaddress).call())['start_time']).toNumber();
        var exp_time2 = ((await myContract.panel_2(currentaddress).call())['exp_time']).toNumber();
        var inv_amt_2 = ((await myContract.panel_2(currentaddress).call())['invested_amount']).toNumber();

        var panel_2_withdraw_all = document.getElementById('panel_2_withdraw_all');

        setInterval(
            function p_p_s_p2() {
                let now = Math.floor(Date.now() / 1000);
                let p_p2;
                if (now <= exp_time2) {
                    if ((((profit2 + profit_withdrawn2) * (now - start_time2)) / (45 * (86400))) > profit_withdrawn2) {
                        p_p2 = (((profit2 + profit_withdrawn2) * (now - start_time2)) / (45 * (86400))) - profit_withdrawn2;
                        profit_2.innerHTML = (p_p2 / 1000000).toFixed(4);
                        p2 = (p_p2 / 1000000).toFixed(4);
                        panel_2_withdraw_all.innerHTML = Number(inv_amt_2 / 1000000) + Number(p2);
                    } else {
                        profit_2.innerHTML = '0';
                        panel_2_withdraw_all.innerHTML = 0;
                    }

                }
                if (now > exp_time2) {
                    profit_2.innerHTML = (profit2 / 1000000).toFixed(4);
                    panel_2_withdraw_all.innerHTML = Number(inv_amt_2 / 1000000) + Number((profit2 / 1000000).toFixed(4));
                }
            }, 1000);

        // -----------------------   Panel - 3  -----------------------------------------
        var profit3 = ((await myContract.panel_3(currentaddress).call())['profit']).toNumber();
        var profit_withdrawn3 = ((await myContract.panel_3(currentaddress).call())['profit_withdrawn']).toNumber();
        var start_time3 = ((await myContract.panel_3(currentaddress).call())['start_time']).toNumber();
        var exp_time3 = ((await myContract.panel_3(currentaddress).call())['exp_time']).toNumber();
        var inv_amt_3 = ((await myContract.panel_3(currentaddress).call())['invested_amount']).toNumber();

        var panel_3_withdraw_all = document.getElementById('panel_3_withdraw_all');

        setInterval(
            function p_p_s_p3() {
                let now = Math.floor(Date.now() / 1000);
                let p_p3;
                if (now <= exp_time3) {
                    if ((((profit3 + profit_withdrawn3) * (now - start_time3)) / (25 * (86400))) > profit_withdrawn3) {
                        p_p3 = (((profit3 + profit_withdrawn3) * (now - start_time3)) / (25 * (86400))) - profit_withdrawn3;
                        profit_3.innerHTML = (p_p3 / 1000000).toFixed(4);
                        p3 = (p_p3 / 1000000).toFixed(4);
                        panel_3_withdraw_all.innerHTML = Number(inv_amt_3 / 1000000) + Number(p3);
                    } else {
                        profit_3.innerHTML = '0';
                        panel_3_withdraw_all.innerHTML = 0;
                    }

                }
                if (now > exp_time3) {
                    profit_3.innerHTML = (profit3 / 1000000).toFixed(4);
                    panel_3_withdraw_all.innerHTML = Number(inv_amt_3 / 1000000) + Number((profit3 / 1000000).toFixed(4));
                }
            }, 1000);


        setInterval(function () {
            total_profit.innerHTML = `${(Number(p1) + Number(p2) + Number(p3)).toFixed(4)} TRX`;
        }, 1000)
    }//profit_per_sec()


}//window onload 
