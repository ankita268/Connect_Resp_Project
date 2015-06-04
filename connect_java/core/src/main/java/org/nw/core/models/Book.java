package org.nw.core.models;

public class Book
{

    private int id;

    private String name;

    private String author;

    private String releaseTime;

    public Book()
    {
        super();
    }

    public Book(int id, String name, String author, String releaseTime)
    {
        super();
        this.id = id;
        this.name = name;
        this.author = author;
        this.releaseTime = releaseTime;
    }

    public String getReleaseTime()
    {
        return releaseTime;
    }

    public void setReleaseTime(String releaseTime)
    {
        this.releaseTime = releaseTime;
    }

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getAuthor()
    {
        return author;
    }

    public void setAuthor(String author)
    {
        this.author = author;
    }

    @Override
    public int hashCode()
    {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((author == null) ? 0 : author.hashCode());
        result = prime * result + id;
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + ((releaseTime == null) ? 0 : releaseTime.hashCode());
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
        Book other = (Book) obj;
        if (author == null)
        {
            if (other.author != null)
                return false;
        }
        else if (!author.equals(other.author))
            return false;
        if (id != other.id)
            return false;
        if (name == null)
        {
            if (other.name != null)
                return false;
        }
        else if (!name.equals(other.name))
            return false;
        if (releaseTime == null)
        {
            if (other.releaseTime != null)
                return false;
        }
        else if (!releaseTime.equals(other.releaseTime))
            return false;
        return true;
    }

    @Override
    public String toString()
    {
        return "Book [id=" + id + ", name=" + name + ", author=" + author + ", releaseTime=" + releaseTime + "]";
    }

}
