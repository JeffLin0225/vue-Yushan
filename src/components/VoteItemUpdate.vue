<template>
    <div ref="exampleRef" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">項目更新</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table>
                        <tr>
                            <td>項目 : </td>
                            <td><input type="text" name="name" :value="modelValue.name" @input="doinput('name', $event)"></td>
                        </tr>   
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary"  @click="callModify(modelValue.id)">修改</button>

                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
    const props = defineProps(["isShowUpdateButton", "modelValue"]);
    const emits = defineEmits([ "customUpdate", "update:modelValue"])
    function doinput(key, event) {
        emits('update:modelValue', {
            ...props.modelValue,
            [key]: event.target.value
        });
    }

    import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js"
    import Swal from 'sweetalert2';
    import axiosapi from '@/plugins/axios.js';
    import { ref, onMounted } from 'vue'

    const exampleRef = ref(null);
    const exampleModal = ref(null);
    onMounted(function() {
        exampleModal.value = new bootstrap.Modal(exampleRef.value);
    });

    function callModify() {
        Swal.fire({
            text: "執行中......",
            allowOutsideClick: false,
            showConfirmButton: false,
        });

        let request ={
            "id" : props.modelValue.id ,
            "name" : props.modelValue.name,
        }
        
        axiosapi.put(`/votesitem/updateVoteItem`,request).then(function(response) {
            if(response.data.success)  {
                Swal.fire({
                    icon: "success",
                    text: response.data.message,
                }).then(function(result) {
                    emits('customUpdate');
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
                text: "修改錯誤："+error.message,
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