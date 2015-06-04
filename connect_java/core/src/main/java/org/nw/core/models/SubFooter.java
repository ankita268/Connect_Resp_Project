package org.nw.core.models;

public class SubFooter
{

    private String text;

    private String link;

    public SubFooter()
    {

    }

    public SubFooter(String text, String link)
    {
        this.text = text;
        this.link = link;
    }

    public String getText()
    {
        return text;
    }

    public void setText(String text)
    {
        this.text = text;
    }

    public String getLink()
    {
        return link;
    }

    public void setLink(String link)
    {
        this.link = link;
    }

    @Override
    public String toString()
    {
        return "ClassPojo [text = " + text + ", link = " + link + "]";
    }
}