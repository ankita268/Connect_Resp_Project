package org.nw.core.models;

import org.nw.core.utilities.TCOPDFExport;

public class NominationType
{
    @TCOPDFExport(header = "id")
    private String id;
    @TCOPDFExport(header = "status")
    private String status;
    @TCOPDFExport(header = "shipper")
    private String shipper;
    @TCOPDFExport(header = "receiptLocation")
    private String receiptLocation;
    @TCOPDFExport(header = "connectingCarrier")
    private String connectingCarrier;
    @TCOPDFExport(header = "connectingShipper")
    private String connectingShipper;
    @TCOPDFExport(header = "commitedBPD")
    private String commitedBPD;
    @TCOPDFExport(header = "uncommitedBPD")
    private String uncommitedBPD;
    @TCOPDFExport(header = "lineFill")
    private String lineFill;
    @TCOPDFExport(header = "totalReceipts")
    private String totalReceipts;
    @TCOPDFExport(header = "availableForDeliver")
    private String availableForDeliver;
    @TCOPDFExport(header = "deliveryLocation")
    private String deliveryLocation;
    @TCOPDFExport(header = "deliveringConnectingCarrier")
    private String deliveringConnectingCarrier;
    @TCOPDFExport(header = "deliveredBarrelsPerDay")
    private String deliveredBarrelsPerDay;
    @TCOPDFExport(header = "deliveringShipper")
    private String deliveringShipper;
    @TCOPDFExport(header = "period")
    private String period;

    private String isLock;

    private boolean markForDeleting;

    public NominationType()
    {
        super();
    }

    public NominationType(String id, String status, String shipper, String receiptLocation, String connectingCarrier, String connectingShipper, String commitedBPD, String uncommitedBPD,
            String lineFill, String totalReceipts, String availableForDeliver, String deliveryLocation, String deliveringConnectingCarrier, String deliveredBarrelsPerDay, String deliveringShipper,
            String period, String isLock, boolean markForDeleting)
    {
        super();
        this.id = id;
        this.status = status;
        this.shipper = shipper;
        this.receiptLocation = receiptLocation;
        this.connectingCarrier = connectingCarrier;
        this.connectingShipper = connectingShipper;
        this.commitedBPD = commitedBPD;
        this.uncommitedBPD = uncommitedBPD;
        this.lineFill = lineFill;
        this.totalReceipts = totalReceipts;
        this.availableForDeliver = availableForDeliver;
        this.deliveryLocation = deliveryLocation;
        this.deliveringConnectingCarrier = deliveringConnectingCarrier;
        this.deliveredBarrelsPerDay = deliveredBarrelsPerDay;
        this.deliveringShipper = deliveringShipper;
        this.period = period;
        this.isLock = isLock;
        this.markForDeleting = markForDeleting;
    }

    public String getId()
    {
        return id;
    }

    public void setId(String id)
    {
        this.id = id;
    }

    public String getStatus()
    {
        return status;
    }

    public void setStatus(String status)
    {
        this.status = status;
    }

    public String getShipper()
    {
        return shipper;
    }

    public void setShipper(String shipper)
    {
        this.shipper = shipper;
    }

    public String getReceiptLocation()
    {
        return receiptLocation;
    }

    public void setReceiptLocation(String receiptLocation)
    {
        this.receiptLocation = receiptLocation;
    }

    public String getConnectingCarrier()
    {
        return connectingCarrier;
    }

    public void setConnectingCarrier(String connectingCarrier)
    {
        this.connectingCarrier = connectingCarrier;
    }

    public String getConnectingShipper()
    {
        return connectingShipper;
    }

    public void setConnectingShipper(String connectingShipper)
    {
        this.connectingShipper = connectingShipper;
    }

    public String getCommitedBPD()
    {
        return commitedBPD;
    }

    public void setCommitedBPD(String commitedBPD)
    {
        this.commitedBPD = commitedBPD;
    }

    public String getUncommitedBPD()
    {
        return uncommitedBPD;
    }

    public void setUncommitedBPD(String uncommitedBPD)
    {
        this.uncommitedBPD = uncommitedBPD;
    }

    public String getLineFill()
    {
        return lineFill;
    }

    public void setLineFill(String lineFill)
    {
        this.lineFill = lineFill;
    }

    public String getTotalReceipts()
    {
        return totalReceipts;
    }

    public void setTotalReceipts(String totalReceipts)
    {
        this.totalReceipts = totalReceipts;
    }

    public String getAvailableForDeliver()
    {
        return availableForDeliver;
    }

    public void setAvailableForDeliver(String availableForDeliver)
    {
        this.availableForDeliver = availableForDeliver;
    }

    public String getDeliveryLocation()
    {
        return deliveryLocation;
    }

    public void setDeliveryLocation(String deliveryLocation)
    {
        this.deliveryLocation = deliveryLocation;
    }

    public String getDeliveringConnectingCarrier()
    {
        return deliveringConnectingCarrier;
    }

    public void setDeliveringConnectingCarrier(String deliveringConnectingCarrier)
    {
        this.deliveringConnectingCarrier = deliveringConnectingCarrier;
    }

    public String getDeliveredBarrelsPerDay()
    {
        return deliveredBarrelsPerDay;
    }

    public void setDeliveredBarrelsPerDay(String deliveredBarrelsPerDay)
    {
        this.deliveredBarrelsPerDay = deliveredBarrelsPerDay;
    }

    public String getDeliveringShipper()
    {
        return deliveringShipper;
    }

    public void setDeliveringShipper(String deliveringShipper)
    {
        this.deliveringShipper = deliveringShipper;
    }

    public String getPeriod()
    {
        return period;
    }

    public void setPeriod(String period)
    {
        this.period = period;
    }

    public String getIsLock()
    {
        return isLock;
    }

    public void setIsLock(String isLock)
    {
        this.isLock = isLock;
    }

    public boolean getMarkForDeleting()
    {
        return markForDeleting;
    }

    public void setMarkForDeleting(boolean markForDeleting)
    {
        this.markForDeleting = markForDeleting;
    }

    @Override
    public int hashCode()
    {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((availableForDeliver == null) ? 0 : availableForDeliver.hashCode());
        result = prime * result + ((commitedBPD == null) ? 0 : commitedBPD.hashCode());
        result = prime * result + ((connectingCarrier == null) ? 0 : connectingCarrier.hashCode());
        result = prime * result + ((connectingShipper == null) ? 0 : connectingShipper.hashCode());
        result = prime * result + ((deliveredBarrelsPerDay == null) ? 0 : deliveredBarrelsPerDay.hashCode());
        result = prime * result + ((deliveringConnectingCarrier == null) ? 0 : deliveringConnectingCarrier.hashCode());
        result = prime * result + ((deliveringShipper == null) ? 0 : deliveringShipper.hashCode());
        result = prime * result + ((deliveryLocation == null) ? 0 : deliveryLocation.hashCode());
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((isLock == null) ? 0 : isLock.hashCode());
        result = prime * result + ((lineFill == null) ? 0 : lineFill.hashCode());
        result = prime * result + (markForDeleting ? 1231 : 1237);
        result = prime * result + ((period == null) ? 0 : period.hashCode());
        result = prime * result + ((receiptLocation == null) ? 0 : receiptLocation.hashCode());
        result = prime * result + ((shipper == null) ? 0 : shipper.hashCode());
        result = prime * result + ((status == null) ? 0 : status.hashCode());
        result = prime * result + ((totalReceipts == null) ? 0 : totalReceipts.hashCode());
        result = prime * result + ((uncommitedBPD == null) ? 0 : uncommitedBPD.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj)
    {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        NominationType other = (NominationType) obj;
        if (availableForDeliver == null)
        {
            if (other.availableForDeliver != null)
                return false;
        }
        else if (!availableForDeliver.equals(other.availableForDeliver))
            return false;
        if (commitedBPD == null)
        {
            if (other.commitedBPD != null)
                return false;
        }
        else if (!commitedBPD.equals(other.commitedBPD))
            return false;
        if (connectingCarrier == null)
        {
            if (other.connectingCarrier != null)
                return false;
        }
        else if (!connectingCarrier.equals(other.connectingCarrier))
            return false;
        if (connectingShipper == null)
        {
            if (other.connectingShipper != null)
                return false;
        }
        else if (!connectingShipper.equals(other.connectingShipper))
            return false;
        if (deliveredBarrelsPerDay == null)
        {
            if (other.deliveredBarrelsPerDay != null)
                return false;
        }
        else if (!deliveredBarrelsPerDay.equals(other.deliveredBarrelsPerDay))
            return false;
        if (deliveringConnectingCarrier == null)
        {
            if (other.deliveringConnectingCarrier != null)
                return false;
        }
        else if (!deliveringConnectingCarrier.equals(other.deliveringConnectingCarrier))
            return false;
        if (deliveringShipper == null)
        {
            if (other.deliveringShipper != null)
                return false;
        }
        else if (!deliveringShipper.equals(other.deliveringShipper))
            return false;
        if (deliveryLocation == null)
        {
            if (other.deliveryLocation != null)
                return false;
        }
        else if (!deliveryLocation.equals(other.deliveryLocation))
            return false;
        if (id == null)
        {
            if (other.id != null)
                return false;
        }
        else if (!id.equals(other.id))
            return false;
        if (isLock == null)
        {
            if (other.isLock != null)
                return false;
        }
        else if (!isLock.equals(other.isLock))
            return false;
        if (lineFill == null)
        {
            if (other.lineFill != null)
                return false;
        }
        else if (!lineFill.equals(other.lineFill))
            return false;
        if (markForDeleting != other.markForDeleting)
            return false;
        if (period == null)
        {
            if (other.period != null)
                return false;
        }
        else if (!period.equals(other.period))
            return false;
        if (receiptLocation == null)
        {
            if (other.receiptLocation != null)
                return false;
        }
        else if (!receiptLocation.equals(other.receiptLocation))
            return false;
        if (shipper == null)
        {
            if (other.shipper != null)
                return false;
        }
        else if (!shipper.equals(other.shipper))
            return false;
        if (status == null)
        {
            if (other.status != null)
                return false;
        }
        else if (!status.equals(other.status))
            return false;
        if (totalReceipts == null)
        {
            if (other.totalReceipts != null)
                return false;
        }
        else if (!totalReceipts.equals(other.totalReceipts))
            return false;
        if (uncommitedBPD == null)
        {
            if (other.uncommitedBPD != null)
                return false;
        }
        else if (!uncommitedBPD.equals(other.uncommitedBPD))
            return false;
        return true;
    }

    @Override
    public String toString()
    {
        return "NominationType [id=" + id + ", status=" + status + ", shipper=" + shipper + ", receiptLocation=" + receiptLocation + ", connectingCarrier=" + connectingCarrier
                + ", connectingShipper=" + connectingShipper + ", commitedBPD=" + commitedBPD + ", uncommitedBPD=" + uncommitedBPD + ", lineFill=" + lineFill + ", totalReceipts=" + totalReceipts
                + ", availableForDeliver=" + availableForDeliver + ", deliveryLocation=" + deliveryLocation + ", deliveringConnectingCarrier=" + deliveringConnectingCarrier
                + ", deliveredBarrelsPerDay=" + deliveredBarrelsPerDay + ", deliveringShipper=" + deliveringShipper + ", period=" + period + ", isLock=" + isLock + ", markForDeleting="
                + markForDeleting + "]";
    }

}
