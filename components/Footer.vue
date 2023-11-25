<script lang="ts">
</script>

<template>
    <div class="footer">
        <div class="footer-body">
            <div class="footer-title">phone.</div>
            <p class="footer-info">Phone number from backend</p>
        </div>
        <div class="footer-body">
            <div class="footer-title">email.</div>
            <p class="footer-info">Email from backend</p>
        </div>
        <div class="footer-body">
            <div class="footer-title">follow me.</div>
            <p class="footer-info">Links from backend</p>
        </div>
        <div class="footer-body">
            <p class="footer-info">© 2035 By Lirije Shabani.</p>
        </div>
    </div>
</template>

<style lang="scss">
.footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #f5f5f5;
    padding: 10px;
    margin-top: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    
    .footer-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        .footer-title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .footer-info {
            font-size: 12px;
            font-weight: 300;
        }
    }
}
</style>