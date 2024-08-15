<template>
    <div ref="exampleRef" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">新增投票項目</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table>
                        <tr>
                            <td>項目名稱 : </td>
                            <td><input type="text" name="name" v-model="name" ></td>
                        </tr>   
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary"  @click="callCreate">新增</button>

                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
    const props = defineProps(["isShowInsertButton", "modelValue"]);
    const emits = defineEmits([ "showUploadOver" , "update:modelValue"])
    import axiosapi from '@/plugins/axios.js';
    import Swal from 'sweetalert2';


    import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js"
    import { ref, onMounted } from 'vue'
    // const showUploadOver = ref(false);
    const exampleRef = ref(null);
    const exampleModal = ref(null);
    const name = ref("");
    onMounted(function() {
        exampleModal.value = new bootstrap.Modal(exampleRef.value);
    });

    function callCreate() {
       
        
        let request ={
            "name" : name.value,
        }

        axiosapi.post("/votesitem/addVoteItem", request).then(function(response) {
            console.log("response", response);
            if(response.data.success)  {
                Swal.fire({
                    icon: "success",
                    text: response.data.message,
                }).then(function(result) {
                    emits('showUploadOver');
                    hideModal();
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
                text: "新增錯誤："+error.message,
            });
        });
    }




    function showModal() {
        exampleModal.value.show();
    }
    function hideModal() {
        exampleModal.value.hide();
    }

    defineExpose({
        showModal, hideModal,
    });
</script>
    
<style>
    
</style>