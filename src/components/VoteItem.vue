<template>
    <div class="col-lg-3 col-md-6"><br>
        <div class="card">
            
            <div class="card-body">
                <h5 class="card-title">{{voteitem.name}}</h5>
                
                <div class="row">
                    <div class="col text-start">
                        <a href="#" class="btn btn-primary" @click="emits('customUpdate', voteitem.id)">開啟修改</a>
                    </div>
                    <div class="col text-end">
                        <a href="#" class="btn btn-primary" @click="emits('customDelete', voteitem.id)">刪除</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
    const props = defineProps(["voteitem"]);
    const emits = defineEmits(["customUpdate", "customDelete"]);

</script>

<style>

</style>