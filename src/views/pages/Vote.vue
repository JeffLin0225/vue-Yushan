<template>
    <h3>所有投票項目</h3>
    <div class="row">
        <div class="col-4">
            <button type="button" class="btn btn-primary" @click="openUploadModal">新增投票項目</button>
        </div>
  
    </div>
    <br>

    <div class="row">
        <VoteItem v-for="voteitem in voteitems" :key="voteitem.id" :voteitem="voteitem"
                     @custom-delete="callRemove" @custom-update="callopenupdate">
        </VoteItem>
    </div>

    <VoteItemUpdate ref="voteModal" :is-show-update-button="isShowUpdateButton" v-model="votefinditem"
                 @custom-update="callFind">
    </VoteItemUpdate>

    <VoteItemInsert ref="voteupModal"  @showUploadOver="callFind">
    </VoteItemInsert>

</template>

<script setup>
    import axiosapi from '@/plugins/axios.js';
    import Swal from 'sweetalert2';
    import VoteItem from '@/components/VoteItem.vue';
    import VoteItemInsert from '@/components/VoteItemInsert.vue';
    import { ref, onMounted } from 'vue';
    import VoteItemUpdate from '@/components/VoteItemUpdate.vue';

    const isShowInsertButton = ref(false);
    const isShowUpdateButton = ref(false);

    const voteitems = ref([ ]);
    const voteitem = ref({ });
    const votefinditem = ref({ });

    const voteModal = ref(null);
    const voteupModal = ref(null);
    onMounted(function() {
        callFind();
    });

    function openUploadModal() {
        voteupModal.value.showModal();
    }

    function callopenupdate(id) {
        
        isShowUpdateButton.value = true;
            callFindById(id);
            voteModal.value.showModal();

    }
    
    function callRemove(id) {
        Swal.fire({
            icon: 'question',
            text: '確定要刪除？',
            showCancelButton: true,
            allowOutsideClick: false
        }).then(function(result) {
            if(result.isConfirmed) {
                Swal.fire({
                    text: "執行中......",
                    allowOutsideClick: false,
                    showConfirmButton: false,
                });
                if(id) {
                    axiosapi.delete("/votesitem/deleteVoteItem/"+id).then(function(response) {
                        console.log("response", response);
                        if(response.data.success) {
                            Swal.fire({
                                icon: "success",
                                text: response.data.message,
                            }).then(function(result) {
                                
                                callFind();
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
                            text: "刪除錯誤："+error.message,
                        });
                    });
                }
            }
        });
    }
    function callFindById(id) {
        Swal.fire({
            text: "處理中.....",
            allowOutsideClick: false,
            showConfirmButton: false
        });

        axiosapi.get(`/votesitem/findBuyId/${id}`).then(function(response) {
            votefinditem.value = response.data.item[0];
            setTimeout(function() {
                Swal.close();
            }, 500);
        }).catch(function(error) {
            console.log("error", error);
            Swal.fire({
                text: "查詢失敗："+error.message,
                icon: "error"
            });
        });
    }
    
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
</script>

<style>

</style>