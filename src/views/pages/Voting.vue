<template>
    <h3>開始投票</h3>

    <div class="row">
        <VotingItem v-for="voteitem in voteitems" :key="voteitem.id" :voteitem="voteitem"
        @custom-open="multiplevoteid">    
        </VotingItem>
    </div>
    <br>
    <div>
        選中的投票ID: {{ voteid }}
    </div>
    <br>
    <div>
        <label for="votename" >你的名字: &nbsp;</label>
        <input type="text" id="votename" v-model="votername" >
    </div>
    <br>
    <button @click="voting" class="btn btn-success">確定投票</button>
<hr>
    <h3>目前累計投票</h3>
    <div v-if="voterecords.length === 0"><h5>(目前沒有投票請投票...)</h5> </div>

    <div v-else>
        <table>
            <tr  v-for="voterecord in voterecords"  :key="voterecord.name" >
                <td>{{voterecord.name}}: &nbsp;</td> 
                <td>{{voterecord.count}}票</td>
            </tr>
        </table>
    </div>
</template>

<script setup>
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import { ref, onMounted } from 'vue';
import VotingItem from '@/components/VotingItem.vue';
const voteitems = ref([ ]);
const voterecords= ref([ ]);

const votername = ref('');
const voteid = ref([]); 


onMounted(function() {
        callFind();
        callFindrecord()
});

function callFind() {
    axiosapi.get("/votesitem/findallItems").then(function(response) {
        voteitems.value = response.data.list;

    }).catch(function(error) {
        console.log("error", error);
        Swal.fire({
            text: "查詢失敗："+error.message,
            icon: "error"
        });
    });
}
function callFindrecord() {
    axiosapi.get("/votes/records").then(function(response) {
        voterecords.value = response.data.list;

    }).catch(function(error) {
        console.log("error", error);
        Swal.fire({
            text: "查詢失敗："+error.message,
            icon: "error"
        });
    });
}

function multiplevoteid(id) {
    const index = voteid.value.indexOf(id);
    if (index > -1) {
        voteid.value.splice(index, 1);
    } else {
        voteid.value.push(id);
    }
}

function voting(){
    console.log("選到的ID:",voteid.value);
    console.log("votername",votername.value);
    
    let request ={
        "voter" : votername.value,
        "itemIds" : voteid.value,
    }
    axiosapi.post("/votes/addVote", request).then(function(response) {
            console.log("response", response);
            if(response.data.success)  {
                Swal.fire({
                    icon: "success",
                    text: response.data.message,
                }).then(function(result) {
                    voteid.value = [];  
                    votername.value = '';  
                    callFind();
                    callFindrecord();
                });
            } else {
                Swal.fire({
                    icon: "warning",
                    text: response.data.message,
                });
            }
        }).catch(function(error) {
            console.log("error", error);
            Swal.fire({
                icon: "error",
                text: "投票錯誤："+error.message,
            });
        });
}

</script>

<style>

</style>