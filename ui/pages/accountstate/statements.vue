<template>
    <div>
        <div class="overview">
            <UserHeader />
            <div class="overview__content white-background content-body">
                <div class="overview__transaction--header">
                    <div class="overview__transaction--h2 header-label">Account Statements and reposts</div>
                </div>

                <AccountStatementSub />

                <div class="overview__transaction--header">
                    <div class="overview__transaction--h2 header-label header-label-smaller">Get account statements report
                        for a
                        period of time</div>
                </div>
                
                <div class="padding-top-bottom"></div>

                <div class="form form-half">
                    <div class="input-area">
                        <label class="smlabel">Destination Bank</label>
                        <div class="input">
                            <input placeholder="Name of Bank" />
                        </div>
                    </div>
                    <div class="input-area">
                        <label class="smlabel">Destination Bank</label>
                        <div class="input">
                            <input placeholder="Name of Bank" />
                        </div>
                    </div>
                    <div class="input-area">
                        <label class="smlabel">Destination Bank</label>
                        <div class="input">
                            <input placeholder="Name of Bank" />
                        </div>
                    </div>

                    <div class="overview__withddep">
                        <button class="button orange-btn-faint fontweight-3 half-flex-space">Get report</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>