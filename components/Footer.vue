<script lang="ts">
</script>

<template>
    <div class="footer">
        <div class="container">
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
                <p class="footer-info">© 2035 by Lirije Shabani.</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.footer {
    border-radius: 10px;
    background-color: #f5f5f5;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    
   .container {
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

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
}
</style>